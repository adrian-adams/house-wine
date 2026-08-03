import { ContentUI, FormSection_TextProps, FormSection_CheckboxProps } from "@/types/ui";
import { CameraIcon, Store, BottleWine, Handshake, ChartNoAxesCombined  } from "lucide-react";

export const accountPerks: Pick<ContentUI, "title" | "icon">[] = [
    { title: "AI Wine Label Scanner", icon: CameraIcon },
    { title: "Your Own Wine Shop", icon: Store },
    { title: "Collection Management", icon: BottleWine },
    { title: "Wine Marketplace", icon: Handshake },
    { title: "Insights & Stats", icon: ChartNoAxesCombined },
]

export const createAccountConfig: FormSection_TextProps["data"] = [
    {
        value: "email",
        label: "Email",
        inputType: "text",
        placeholder: "user@housewine.com",
        required: true
    },
    {
        value: "password",
        label: "Password",
        inputType: "password",
        placeholder: "",
        required: true
    }
];