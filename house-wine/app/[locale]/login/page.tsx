"use client"

import React, { useState } from 'react'

// Misc
import { useTranslations } from 'next-intl'
import { mergeFormData } from '@/components/layout/HWOrderForm';
import { loginConfig } from './ContentList';
import { routes } from '@/lib/routes';
// Nextjs
import Link from 'next/link'
// Components
import { FormSection_Text } from '@/components/layout/HWOrderForm';
import { Button } from '@/components/ui/button';
// Lucide
import { MoveLeft } from 'lucide-react';

interface LoginFormProps {
    user: {
        email: string
        password: string
    }
}

export default function Login() {
    const t = useTranslations('logIn');

    const EN = {
        title: t('title'),
        email: t('email'),
        password: t('password'),
        errorMessage: t('errorMessage'),
        forgotPassword: t('forgotPassword'),
        signIn: t('signIn'),
        signUp: t('signUp'),
        backToHome: t('backToHome'),
        form: {
            fields: t.raw('fields') as { value: string, label: string }[],
            get mergedData() {
                return {
                    userLogin: mergeFormData(this.fields, loginConfig)
                }
            }
        }
    }

    const initialState: LoginFormProps = {
        user: {
            email: "",
            password: ""
        }
    }

    const [formData, setFormData] = useState<LoginFormProps>(initialState);

    const handleLoginChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            user: { ...prev.user, [name]: value }
        }))
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <form action="" className="hw-user-log-form">
                <h1 className="text-[clamp(1.5rem,5vw,2.75rem)]">{EN.title}</h1>
                <FormSection_Text
                    data={EN.form.mergedData.userLogin}
                    values={formData.user}
                    onChange={handleLoginChange}
                />
                <Button type="submit" className="w-full">
                    {EN.signIn}
                </Button>
                <Link href={routes.register()} className="italic text-neutral-700 hover:underline hover:underline-offset-6">
                    {EN.signUp}
                </Link>
            </form>
            <Link href={routes.home()} className="flex flex-row items-center gap-2 border-b border-neutral-600 w-fit">
                <MoveLeft />
                {EN.backToHome}
            </Link>
        </div>
    )
}
