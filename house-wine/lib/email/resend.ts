import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY);

export const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL as string;
export const FROM_ADDRESS = 'House Wine <onboarding@resend.dev>';