import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb/connectDB";
import { OrderRequest } from "@/lib/mongodb/models/OrderRequest";
import { orderRequestPayloadSchema } from "@/lib/validation/orderRequest_Validation";
import { sendOrderEmails } from "@/lib/email/sendOrderEmails";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = orderRequestPayloadSchema.safeParse(body);

        if (!result.success) {  
            return NextResponse.json(
                { success: false, errors: result.error.issues },
                { status: 400 }
            );
        }

        await connectDB();
        const order = await OrderRequest.create(result.data);

        sendOrderEmails(order).catch((err) => {
            console.error("sendOrderEmails failed unexpectedly:", err);
        });

        return NextResponse.json(
            { success: true, orderId: order._id }, 
            { status: 201 }
        );
        
    } catch (error) {
        if (error instanceof Error) {
            console.error("Order request failed:", error.message);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Unknown error occured" },
            { status: 500 }
        );
    }
}