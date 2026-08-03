"use client"

import React, { useState } from 'react'

// Lists
import { accountPerks, createAccountConfig } from './ContentList';
import { RegistrationFormState } from '@/types/ui';
import { routes } from '@/lib/routes';
import { useTranslations } from 'next-intl';
// Nextjs
import Image from 'next/image'
import Link from 'next/link'
// Components
import { mergeFormData, FormSection_Text, FormSection_Checkbox } from '@/components/layout/HWOrderForm'
import { Button } from '@/components/ui/button';
// Lucide
import { Info, MoveLeft, CircleCheck } from 'lucide-react';

export default function page() {
    const t = useTranslations('register');
    const ENformFieldList = t.raw('createAccount.formFields') as { value: string, label: string }[]
    const formList = mergeFormData(ENformFieldList, createAccountConfig)
    const EN = {
        root: {
            title: t('title'),
            desc: t('desc'),
            subDesc: t('subDesc')
        },
        createAccount: {
            title: t('createAccount.title'),
            email: t('createAccount.email'),
            password: t('createAccount.password'),
            errorMessage: t('createAccount.errorMessage'),
            signUpMessage: t('createAccount.signUpMessage'),
            acceptTerms: t('createAccount.acceptTerms'),
            terms: t('createAccount.termsAndConditions'),
            privacy: t('createAccount..privacyPolicy'),
            signUpBtn: t('createAccount.signUpBtn'),
            signInBtn: t('createAccount.signInBtn'),
            backToHomeBtn: t('createAccount.backToHomeBtn')
        },
        features: {
            featuresList: t.raw('features') as { title: string, desc: string }[]
        }
    }

    const initialState: RegistrationFormState = {
        newUser: {
            email: "",
            password: ""
        },
        checkbox: false
    }

    const [formData, setFormData] = useState<RegistrationFormState>(initialState);

    const handleContactChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            newUser: { ...prev.newUser, [name]: value }
        }))
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <section className="text-center space-y-4">
                <h1 className="text-[clamp(1.5rem,5vw,2.75rem)]">{EN.root.title}</h1>
                <p className="text-neutral-700 text-xl">{EN.root.desc}</p>
                <span className="flex flex-row items-center justify-center gap-2">
                    <CircleCheck className="size-4 fill-green-700 stroke-white" />
                    <p className="text-[clamp(0.65rem,5vw,1rem)] font-semibold text-green-700">
                        {EN.root.subDesc}
                    </p>
                </span>
            </section>
            <section className="flex flex-col-reverse lg:flex-row gap-14 w-full">
                <div className="w-full flex flex-col gap-4 items-center">
                    <form action="" className="w-full bg-white p-8 rounded-xl text-center space-y-6">
                        <h2>{EN.createAccount.title}</h2>
                        <FormSection_Text
                            data={formList}
                            values={formData.newUser}
                            onChange={handleContactChange}
                        />
                        <div className="flex flex-row items-start justify-start gap-4 p-4 bg-neutral-200 rounded-xl border-2 border-neutral-300">
                            <span>
                                <Info className="size-5 stroke-neutral-300 fill-neutral-700" />
                            </span>
                            <p className="text-left text-xs">
                                {EN.createAccount.signUpMessage}
                            </p>
                        </div>
                        {/* <FormSection_Checkbox
                            data={ }
                        /> */}
                        <Button type="submit" className="w-full bg-neutral-600 text-xl">
                            {EN.createAccount.signUpBtn}
                        </Button>
                    </form>
                    <Link href={routes.home()} className="flex flex-row items-center gap-2 border-b border-neutral-600 w-fit">
                        <MoveLeft />
                        {EN.createAccount.backToHomeBtn}
                    </Link>
                </div>
                <ul className="space-y-4 w-full">
                    {accountPerks.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="p-4 bg-white rounded-xl flex flex-row gap-2 border-2 border-neutral-300">
                                {Icon && (
                                    <div className="bg-neutral-300 p-2 inline rounded-md h-fit">
                                        <Icon className="stroke-neutral-700" />
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <h3 className="text-[clamp(0.75rem,5vw,1rem)] font-semibold">
                                        {t.raw(`features.${index}.title`)}
                                    </h3>
                                    <p className="text-xl text-neutral-600">
                                        {t.raw(`features.${index}.desc`)}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>

    )
}
