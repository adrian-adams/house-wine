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
        value: "firstName",
        label: "First Name",
        inputType: "text",
        placeholder: "John",
        required: true,
        className: "md:col-span-2"
    },
    {
        value: "lastName",
        label: "Last Name",
        inputType: "text",
        placeholder: "Doe",
        required: true,
        className: "md:col-span-2"
    },
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


export const checkboxConfig: FormSection_CheckboxProps["data"] = [
    {
        value: "userAgreement",
        label: ""
    },
    {
        value: "marketing",
        label: ""
    }
]