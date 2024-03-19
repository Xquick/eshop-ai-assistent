export enum Status {
    SUCCESS= 'success',
    PROCESSING= 'processing',
    WAITING= 'waiting',
    FAILED= 'failed',
    ERROR= 'error',
}

export enum Size {
    SMALL= 'small',
    MEDIUM= 'medium',
    LARGE= 'large',
}

export enum Orientation {
    LANDSCAPE= 'landscape',
    PORTRAIT= 'portrait',
    SQUARE= 'square',
}

export const SIZE_MAP_BY_ORIENTATION = {
    [Orientation.LANDSCAPE]: {
        height: '480',
        width: '640'
    },
    [Orientation.PORTRAIT]: {
        height: '640',
        width: '480'
    },
    [Orientation.SQUARE]: {
        height: '512',
        width: '512'
    },
}

export const SIZE_PX_MAP = {
    [Size.SMALL]: '256px',
    [Size.MEDIUM]: '512px',
    [Size.LARGE]: '1024px',
}

export enum Language {
    CZECH = 'czech',
    ENGLISH = 'english',
}

export enum Locale {
    CS = 'cs',
    EN = 'en'
}

export const LANGUAGE_LOCALE_MAP = {
    [Language.CZECH]: Locale.CS,
    [Language.ENGLISH]: Locale.EN,
}