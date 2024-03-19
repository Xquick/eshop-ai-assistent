export enum SubscriptionId {
    TRIAL= 'trial',
    CANCELED= 'canceled',
    PAUSED= 'paused',
    MONTH_1='month-1',
    MONTH_2='month-2',
    MONTH_3='month-3',
    MONTH_4='month-4',
    MONTH_5='month-5',
    YEAR_1='year-1',
    YEAR_2='year-2',
    YEAR_3='year-3',
    YEAR_4='year-4',
    YEAR_5='year-5',
}

export interface ISupabaseSubscriptionType {
    id: SubscriptionId,
    period: number,
    price: number,
    payment_frequency: number,
    token_count: number,
}

export interface BMSubscription {
    uid: string,
    type: string,
    starts_at: string,
    subscription_types: {
        period: number,
        price: number,
        payment_frequency: 'string',
        token_count: number,
    }
}

export interface ISubscriptionType {
    period: number,
    price: number,
    payment_frequency: string,
    token_count: number,
}

export interface ISubscription {
    id: string,
    uid: string,
    type: string,
    type_next: string, // this type will be paid in next payment
    starts_at: string,
    subscription_type: ISubscriptionType
}

export interface BMSubscription {
    uid: string,
    type: string,
    starts_at: string,
    currentType: {
        id: string,
        period: number,
        payment_frequency: 'string',
        token_count: number,
    }
    nextType: {
        id: string,
        period: number,
        payment_frequency: 'string',
        token_count: number,
    }
}

export const SUGGESTION_DELIMITER = `#<SUGGESTIONS>#`;