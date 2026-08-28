import * as React from 'react';
import type { RichTranslationValues } from 'next-intl';

export type TFunction = {
    rich: (key: any, values?: RichTranslationValues) => React.ReactNode;
};

type TextArray = {
    title: string
    desc: string
}

interface RichFieldProps {
    t: TFunction;
    textField: string | TextArray[keyof TextArray];
    extraTags?: RichTranslationValues;
    className?: string
}

export const richField = ({ t, textField, extraTags = {}, className }: RichFieldProps) =>
    t.rich(textField, {
        lt: '<',
        gt: '>',
        span: (chunks: React.ReactNode) => <span className={className}>{chunks}</span>,
        b: (chunks: React.ReactNode) => <b className={className}>{chunks}</b>,
        strong: (chunks: React.ReactNode) => <strong className={className}>{chunks}</strong>,
        i: (chunks: React.ReactNode) => <i className={className}>{chunks}</i>,
        a: (chunks: React.ReactNode) => <a href={`mailto:${chunks}`} target='_blank' className={className}>{chunks}</a>,
        ...extraTags,
    }); 