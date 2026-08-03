import * as React from 'react';
import type { RichTranslationValues } from 'next-intl';

type TFunction = {
    rich: (key: any, values?: RichTranslationValues) => React.ReactNode;
};

interface RichFieldProps {
    t: TFunction;
    textField: string;
    extraTags?: RichTranslationValues;
}

export const richField = ({ t, textField, extraTags = {} }: RichFieldProps) =>
    t.rich(textField, {
        lt: '<',
        gt: '>',
        b: (chunks: React.ReactNode) => <b>{chunks}</b>,
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
        ...extraTags,
    });