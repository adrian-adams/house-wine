import * as React from 'react';
import type { RichTranslationValues } from 'next-intl';
import { ValueOf } from 'next/dist/shared/lib/constants';

type TFunction = {
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
}

export const richField = ({ t, textField, extraTags = {} }: RichFieldProps) =>
    t.rich(textField, {
        lt: '<',
        gt: '>',
        b: (chunks: React.ReactNode) => <b>{chunks}</b>,
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
        a: (chunks: React.ReactNode) => <a href={`mailto:${chunks}`} target='_blank'>{chunks}</a>,
        ...extraTags,
    });