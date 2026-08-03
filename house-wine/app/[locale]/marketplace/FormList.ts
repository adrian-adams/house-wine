import { 
    FormSection_TextProps, 
    FormSection_SelectProps, 
    FormSection_RadioProps,
    FormSection_CheckboxProps
} from "@/types/ui"

export const countries: FormSection_SelectProps["data"] = [
    { value: "Nederland", label: "Nederland" },
    { value: "België", label: "België" },
    { value: "Duitsland", label: "Duitsland" },
    { value: "Frankjirk", label: "Frankjirk" },
    { value: "Luxemburg", label: "Luxemburg" },
    { value: "Oostenrijk", label: "Oostenrijk" },
    { value: "Italië", label: "Italië" },
    { value: "Spanje", label: "Spanje" },
    { value: "Portugal", label: "Portugal" },
    { value: "Denemarken", label: "Denemarken" },
    { value: "Zweden", label: "Zweden" },
    { value: "Finland", label: "Finland" },
    { value: "Polen", label: "Polen" },
    { value: "Tsjechië", label: "Tsjechië" },
    { value: "Ierland", label: "Ierland" },
    { value: "VerenigdKoninkrijk", label: "Verenigd Koninkrijk" },
    { value: "Zwistserland", label: "Zwistserland" },
    { value: "Noorwegen", label: "Noorwegen" },
    { value: "VerenigdeStaten", label: "Verenigde Staten" },
    { value: "Canada", label: "Canada" },
]

export const buyerConfig: FormSection_TextProps["data"] = [
    { 
        value: "firstName", 
        label: "",
        placeholder: "John",
        inputType: "text", 
        className: "md:col-span-2", 
        required: true
    },
    { 
        value: "lastName", 
        label: "",
        placeholder: "Doe",
        inputType: "text", 
        className: "md:col-span-2",
        required: true
    },
    { 
        value: "email", 
        label: "",
        placeholder: "johndoe@rmail.com",
        inputType: "email", 
        className: "",
        required: true
    },
    { 
        value: "number", 
        label: "",
        placeholder: "084 592 6123",
        inputType: "tel", 
        className: "",
        required: true
    },
]

export const deliveryConfig: FormSection_RadioProps["data"] = [
    { value: "pickup", label: "Pickup" },
    { value: "shipment", label: "Shipment" },
]

export const shipmentConfig: FormSection_TextProps["data"] = [
    {
        value: "streetNumber",
        label: "",
        placeholder: "99",
        inputType: "text",
        className: "md:col-span-1",
        required: true
    },
    {
        value: "street1",
        label: "",
        placeholder: "Main Road",
        inputType: "text",
        className: "md:col-span-3",
        required: true
    },
    {
        value: "street2",
        label: "",
        placeholder: "Stadium on Main",
        inputType: "text",
        className: "",
        required: false
    },
    {
        value: "postalCode",
        label: "",
        placeholder: "7708",
        inputType: "text",
        className: "md:col-span-2",
        required: true
    },
    {
        value: "city",
        label: "",
        placeholder: "Canada",
        inputType: "text",
        className: "md:col-span-2",
        required: true
    }   
]

export const keepUpdatedConfig: FormSection_CheckboxProps["data"] = [
    { value: "marketing", label: "" }
]