type Messages = typeof import('@/messages/en.json');

declare global {
    // Intentionally empty - extended by type augmentation
    interface IntlMessages extends Messages {}
}
