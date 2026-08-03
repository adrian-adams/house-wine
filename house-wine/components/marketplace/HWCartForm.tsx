"use client"

import React, { useState } from 'react'
// Lists, Zustand, Types, NextIntl
import { countries, buyerConfig, shipmentConfig, keepUpdatedConfig, deliveryConfig } from '@/app/[locale]/marketplace/FormList';
import { AnimatePresence, motion } from 'motion/react';
import { useCartStore } from '@/lib/zustand/cart';
import { OrderRequestFormState, DeliveryMethod } from '@/types/ui';
import { useTranslations } from 'next-intl';
import { orderRequestPayloadSchema } from '@/lib/validation/orderRequest_Validation';
// Components
import {
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";
import { Button } from '../ui/button';
import { StoreDisclaimer } from '@/components/layout/HWOrderForm'
import {
    mergeFormData,
    FormSection_Container,
    FormSection_Text,
    FormSection_Select,
    FormSection_Radio,
    FormSection_TextArea,
    FormSection_Checkbox
} from '../layout/HWOrderForm';
import { Spinner } from '../ui/spinner';

export default function CartForm() {
    const t = useTranslations('marketplace');

    const buyerText = t.raw('cart.orderForm.formBody.buyerDetails') as { value: string, label: string }[];
    const buyerFields = mergeFormData(buyerText, buyerConfig);

    const deliveryText = t.raw('cart.orderForm.formBody.deliveryDetails.deliveryOptions') as { value: string, label: string }[];
    const deliveryFields = mergeFormData(deliveryText, deliveryConfig);

    const shipmentText = t.raw('cart.orderForm.formBody.deliveryDetails.shipment.formBlock.form') as { value: string, label: string }[];
    const shipmentFields = mergeFormData(shipmentText, shipmentConfig);

    const keepUpdatedText = t.raw('cart.orderForm.formBody.keepUpdated') as { value: string, label: string }[];
    const keepUpdatedFields = mergeFormData(keepUpdatedText, keepUpdatedConfig);

    const cartToggle = useCartStore((state) => state.cartToggle);
    const showThankYou = useCartStore((state) => state.showThankYou);
    const showDrawer = useCartStore((state) => state.isDrawer);
    const drawerToggle = useCartStore((state) => state.drawerToggle);

    const initialState: OrderRequestFormState = {
        contact: {
            firstName: "",
            lastName: "",
            email: "",
            number: "",
        },
        deliveryChoice: "shipment",
        deliveryAddress: {
            streetNumber: "",
            street1: "",
            street2: "",
            postalCode: "",
            city: "",
            country: ""
        },
        message: "",
        marketing: false,
    }

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<OrderRequestFormState>(initialState);

    const handleContactChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, [name]: value }
        }))
    }

    const handleDeliveryChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            deliveryAddress: {
                ...prev.deliveryAddress,
                [name]: value
            }
        }));
    }

    const handleCountryChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            deliveryAddress: {
                ...prev.deliveryAddress,
                country: value
            }
        }))
    }

    const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            message: value
        }));
    }

    const handleKeepUpdatedChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            marketing: checked
        }));
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submitting form");
        setSubmitError(null);
        setErrors({});

        console.log("payload");
        const items = useCartStore.getState().items;
        const payload = { ...formData, items };

        console.log("result");
        const result = orderRequestPayloadSchema.safeParse(payload);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            for (const issue of result.error.issues) {
                const key = issue.path[issue.path.length - 1] as string;
                fieldErrors[key] = issue.message;
            }
            setErrors(fieldErrors);
            setSubmitError("Please check the highlighted fields and try again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/orders/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.data)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(errorBody?.error ?? 'Something went wrong submitting your request.');
            }

            cartToggle();
            setFormData(initialState);
            useCartStore.getState().clearCart();
            drawerToggle();
            showThankYou();

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="space-y-6 p-4"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <StoreDisclaimer
                        label={t('cart.cartStore.cartFooter.disclaimer.title')}
                        desc={t('cart.cartStore.cartFooter.disclaimer.desc')}
                    />
                    <form onSubmit={handleSubmit} noValidate>
                        <FieldGroup>
                            <FormSection_Text
                                data={buyerFields}
                                values={formData.contact}
                                onChange={handleContactChange}
                                className="after:content-['*']"
                                errors={errors}
                            />
                            <FormSection_Radio
                                data={deliveryFields}
                                radioOption={formData.deliveryChoice}
                                onValueChange={(value) => setFormData((prev) => ({
                                    ...prev,
                                    deliveryChoice: value as DeliveryMethod
                                }))}
                                label={`${t('cart.orderForm.formBody.deliveryDetails.title')} *`}
                            />
                            <AnimatePresence mode="wait">
                                {formData.deliveryChoice === "pickup" ? (
                                    <motion.div
                                        key="pickup"
                                        initial={{ x: "-100%", opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: "-100%", opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <FormSection_Container legend={t('cart.orderForm.formBody.deliveryDetails.pickup.formBlock.legend')}>
                                            <p className="text-neutral-950">Admiraal de Ruijterstraat 38 Sliedrecht 3361VC Woning</p>
                                        </FormSection_Container>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="shipment"
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: "100%", opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <FormSection_Text
                                            data={shipmentFields}
                                            values={formData.deliveryAddress}
                                            onChange={handleDeliveryChange}
                                            className="after:content-['*']"
                                            legend={t('cart.orderForm.formBody.deliveryDetails.shipment.formBlock.legend')}
                                            errors={errors}
                                        >
                                            <FormSection_Select
                                                data={countries}
                                                inputName='country'
                                                label={t('cart.orderForm.formBody.deliveryDetails.shipment.formBlock.selectLabel')}
                                                placeholder={t('cart.orderForm.formBody.deliveryDetails.shipment.formBlock.selectPlaceholder')}
                                                className="col-span-4"
                                                onValueChange={handleCountryChange}
                                                value={formData.deliveryAddress.country}
                                                inputRequired={true}
                                                errors={errors}
                                            />
                                        </FormSection_Text>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <FormSection_TextArea
                                value={formData.message}
                                onAreaChange={handleMessageChange}
                                label={t('cart.orderForm.formBody.message.title')}
                                placeholder={t('cart.orderForm.formBody.message.placeholder')}
                                inputRequired={false}
                            />
                            <FormSection_Checkbox
                                data={keepUpdatedFields}
                                onCheckedChange={handleKeepUpdatedChange}
                                checked={formData.marketing}
                            />
                            <FieldSet>
                                <FieldGroup className="flex flex-row items-center justify-between">
                                    <Button className='flex-1/2' variant='hw_secondary' onClick={cartToggle} type="button">
                                        {t('cart.orderForm.formFooter.backBtn')}
                                    </Button>
                                    <Button type='submit' className='flex-1/2'>
                                        {isSubmitting
                                            ? <span className="flex flex-row items-center justify-center gap-1">Submitting...<Spinner /></span>
                                            : `${t('cart.orderForm.formFooter.sendRequesBtn')}`
                                        }
                                    </Button>
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                        <Button className='mt-4' variant='hw_secondary' onClick={() => setFormData(initialState)} type="button">
                            Clear Form Test
                        </Button>
                    </form>
                </motion.div>
            </AnimatePresence>
            {/* <Dialog
                open={showThankYou}
                onOpenChange={() => setShowThankYou(false)}
            >
                <ThankYouDialog />
            </Dialog> */}
        </>
    )
}