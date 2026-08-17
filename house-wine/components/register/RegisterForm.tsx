"use client"

import React, { useState, useEffect } from 'react'

// Misc
import { createAccountConfig, checkboxConfig } from '@/app/[locale]/register/ContentList';
import { RegistrationFormState } from '@/types/ui';
import { routes } from '@/lib/routes';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { userSignUpPayloadSchema } from '@/lib/zod/userSignUp';
import { signIn } from 'next-auth/react'
// Nextjs
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
// Components
import { mergeFormData, FormSection_Text, FormSection_Checkbox } from '@/components/layout/HWOrderForm'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Google from '@/components/svgs/Google';
// Lucide
import { Info, MoveLeft, Dot } from 'lucide-react';

interface RegisterFormProps {
    onSuccess: () => void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
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

    const initialState: RegistrationFormState = {
        user: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            authProvider: 'credentials'
        },
        permissions: {
            acceptTerms: false,
            marketing: false
        }
    }

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [marketingOptIn, setMarketingOptIn] = useState<boolean>(false);
    const [formData, setFormData] = useState<RegistrationFormState>(initialState);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleContactChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            user: { ...prev.user, [name]: value }
        }))
    }

    const handleTermsChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            permissions: { ...prev.permissions, acceptTerms: checked }
        }))
    }

    const handleMarketingChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            permissions: { ...prev.permissions, marketing: checked }
        }))
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submitting form");

        setSubmitError(null);
        setErrors({});

        console.log("payload");
        const payload = formData;

        console.log("result");
        const result = userSignUpPayloadSchema.safeParse(payload);

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

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.data)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);

                if (response.status === 409) {
                    setErrors({ email: errorBody?.error ?? 'An account with this email already exists.' })
                }

                throw new Error(errorBody?.error ?? 'Something went wrong submitting your request.');
            }

            const marketingOptedIn = formData.permissions.marketing;

            setFormData(initialState);
            setMarketingOptIn(marketingOptedIn);
            if (response.ok) {
                onSuccess();
            }

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Unexpected error');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (searchParams.get('welcome') === 'google') {
            onSuccess();
            router.replace(routes.register());
        }
    }, [searchParams, router, onSuccess])

    return (
        <div className="w-full flex flex-col gap-4 items-center">
            <form onSubmit={handleSubmit} noValidate className="hw-user-log-form">
                <h2>{EN.createAccount.title}</h2>
                <FormSection_Text
                    data={EN.form.mergedData.newUser}
                    values={formData.user}
                    onChange={handleContactChange}
                    errors={errors}
                />
                {submitError && (
                    <p className="text-red-600 text-sm" role="alert">{submitError}</p>
                )}
                <div className="flex flex-row items-start justify-start gap-4 p-4 bg-neutral-200 rounded-xl border-2 border-neutral-300">
                    <span>
                        <Info className="size-5 stroke-neutral-300 fill-neutral-700" />
                    </span>
                    <p className="text-left text-xs">
                        {EN.createAccount.signUpMessage}
                    </p>
                </div>
                <div className="text-start">
                    <FormSection_Checkbox
                        data={EN.form.mergedData.acceptTerms}
                        checked={formData.permissions.acceptTerms}
                        onCheckedChange={handleTermsChange}
                        errors={errors}
                    />
                    <div className="flex flex-row items-center text-xs mt-1 text-neutral-800 ps-6">
                        <Link
                            href={routes.terms()}
                            className="underline underline-offset-4 hover:text-neutral-950"
                        >
                            {EN.createAccount.terms}
                        </Link>
                        <Dot />
                        <Link
                            href={routes.privacy()}
                            className="underline underline-offset-4 hover:text-neutral-950"
                        >
                            {EN.createAccount.privacy}
                        </Link>
                    </div>
                </div>
                <Separator className="max-w-11/12 mx-auto" />
                <FormSection_Checkbox
                    data={EN.form.mergedData.marketing}
                    checked={formData.permissions.marketing}
                    onCheckedChange={handleMarketingChange}
                    errors={errors}
                />
                <div>
                    <Button
                        type="submit"
                        className={cn(
                            'w-full bg-neutral-600 text-xl',
                            !formData.permissions.acceptTerms && 'pointer-events-none opacity-50'
                        )}
                    >
                        {isSubmitting ?
                            <span className="flex flex-row items-center justify-center gap-1">Submitting...<Spinner /></span> :
                            <span>{EN.createAccount.signUpBtn}</span>
                        }
                    </Button>
                    <p className="my-2 font-bold">OR</p>
                    <Button
                        type="button"
                        onClick={() => signIn('google', { callbackUrl: `${routes.register()}?welcome=google` })}
                        className="w-full bg-neutral-900 text-xl flex items-center justify-center gap-2"
                    >
                        <span className="bg-white rounded-full p-1.5">
                            <Google />
                        </span>
                        {EN.createAccount.google.button}
                    </Button>
                    <p className="text-xs text-neutral-700 mt-1.5">{EN.createAccount.google.disclaimer}</p>
                </div>
            </form>
            <Link
                href={routes.home()}
                className="flex flex-row items-center gap-2 border-b border-neutral-600 w-fit"
            >
                <MoveLeft />
                {EN.createAccount.backToHomeBtn}
            </Link>
            <ThankYouMessage condition={marketingOptIn} />
        </div>
    )
}

function ThankYouMessage({ condition }: { condition: boolean }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-bold text-2xl text-center">
                    Welcome!
                </DialogTitle>
                <DialogDescription>
                    Thanks for signing up with House Wine! Enjoy the features and we look forward to doing business with you!
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col items-center">
                {condition &&
                    <span className="font-bold">
                        Stay tuned for some our mailers and promos!
                    </span>
                }
                <DialogClose className="bg-neutral-700 rounded-md py-2 px-4 text-white cursor-pointer">
                    Close
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}


