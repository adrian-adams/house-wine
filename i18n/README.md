Guide on Language Set Up

###### Initial Set Up ######

###### Usage in Files: ######

## Basic Usage:

const t = [get | use]Translations('object')

# Generic Reference
<h1>{t('title')}</h1>

# Map Reference
<p>{t(`perks.${index}.desc`)}</p>

# Rich Text
{
  "hero": {
    "title": "Here is <highlight>some</highlight> text"
  }
}

t.rich('title', {
    highlight: (chunks) => <span className="text-violet-500">{chunks}</span>
})

# Server Files:
import { getTranslations } from 'next-intl/server'

export default async function PricingPage() {
    const t = await getTranslations('pricing')
    
    return (
        <h1>{t('title')}</h1>
    )
}

# Client Files:
"use client" 

// Next-Intl
import { useTranslations } from 'next-intl';

export default function PricingPage() {
    const t = useTranslations('pricing')
    
    return (
    
        <h1>{t('title')}</h1> //Generic Reference
        <p>{t(`perks.${index}.desc`)}</p> //Map Reference
    )
}

## Metadata

export async function generateMetadata({ params }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata' })
    return { title: t('title') }
}

