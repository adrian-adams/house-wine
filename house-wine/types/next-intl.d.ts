import en from '../messages/en.json'

type Messages = typeof en

declare global {
    // Intentionally empty - extended by type augmentation
    interface IntlMessages extends Messages {}
}

export {}