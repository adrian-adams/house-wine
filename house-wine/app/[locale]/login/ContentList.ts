import { ContentUI, FormSection_TextProps, FormSection_CheckboxProps } from "@/types/ui";

export const loginConfig: FormSection_TextProps["data"] = [
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
        required: true,
    }
];
