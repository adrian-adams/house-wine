"use client"

import React, { useState } from 'react'

// Misc
import { accountPerks, createAccountConfig, checkboxConfig } from './ContentList';
import { useTranslations } from 'next-intl';

// Components
import { mergeFormData } from '@/components/layout/HWOrderForm'

import {
    Dialog,
} from "@/components/ui/dialog"
import RegisterForm from '@/components/register/RegisterForm';
// Lucide
import { CircleCheck } from 'lucide-react';

export default function page() {
    const t = useTranslations('register');
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
            // acceptTerms: t.raw('createAccount.persmissions'),
            terms: t('createAccount.termsAndConditions'),
            privacy: t('createAccount.privacyPolicy'),
            signUpBtn: t('createAccount.signUpBtn'),
            // signInBtn: t('createAccount.signInBtn'),
            backToHomeBtn: t('createAccount.backToHomeBtn'),
            google: {
                button: t('createAccount.google.button'),
                disclaimer: t('createAccount.google.disclaimer')
            }
        },
        features: {
            featuresList: t.raw('features') as { title: string, desc: string }[]
        },
        form: {
            newUser: {
                ENList: t.raw('createAccount.formFields') as { value: string, label: string }[],
            },
            checkbox: {
                ENPermissions: t.raw('createAccount.permissions') as { value: string, label: string }[],
            },
            get mergedData() {
                return {
                    newUser: mergeFormData(this.newUser.ENList, createAccountConfig),
                    acceptTerms: mergeFormData(
                        this.checkbox.ENPermissions.filter((item) => item.value === 'acceptTerms'),
                        checkboxConfig.filter((item) => item.value === 'acceptTerms')
                    ),
                    marketing: mergeFormData(
                        this.checkbox.ENPermissions.filter((item) => item.value === 'marketing'),
                        checkboxConfig.filter((item) => item.value === 'marketing')
                    )
                }
            },
        }
    }

    const [thankYouMessage, setThankYouMessage] = useState<boolean>(false);

    return (
        <Dialog open={thankYouMessage} onOpenChange={setThankYouMessage}>
            <div className="flex flex-col items-center gap-8">
                {/* Title */}
                <section className="text-center space-y-4">
                    <h1 className="text-[clamp(1.5rem,5vw,2.75rem)]">{EN.root.title}</h1>
                    <p className="text-neutral-700 text-xl">{EN.root.desc}</p>
                    <span className="flex flex-row items-center justify-center gap-2">
                        <CircleCheck className="size-4 fill-green-700 stroke-white" />
                        <p className="text-[clamp(0.65rem,5vw,1rem)] font-semibold text-green-700">
                            {EN.root.subDesc}
                            {t('createAcc ')}
                        </p>
                    </span>
                </section>
                <section className="flex flex-col-reverse lg:flex-row gap-14 w-full">
                    <RegisterForm onSuccess={() => setThankYouMessage(true)} />
                    {/* Features List */}
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
                                        <h3 className="text-[clamp(0.75rem,5vw,1rem)] font-semibold tracking-wider">
                                            {t.raw(`features.${index}.title`)}
                                        </h3>
                                        <p className="text-[clamp(0.65rem,5vw,0.85rem)] text-neutral-600">
                                            {t.raw(`features.${index}.desc`)}
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </div>
        </Dialog>
    )
}


