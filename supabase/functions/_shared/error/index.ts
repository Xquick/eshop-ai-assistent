import {corsHeaders} from "../cors.ts";

export function getErrorResponse(error: ExceptionWithCode) {
    return new Response(JSON.stringify(error), {
        headers: {
            ...corsHeaders,
            'Content-Type': 'json/application'
        },
        status: 400,
    });
}

interface IExceptionWithCode {
    ok?: boolean;
    message: string;
    code: string;
}

export class ExceptionWithCode implements IExceptionWithCode{
    message: string;
    code: string;
    ok?: boolean;

    constructor({ message, code }: IExceptionWithCode) {
        this.message = message;
        this.code = code;
        this.ok = false;
    }

    toJson() {
        return {
            message: this.message,
            code: this.code,
            ok: this.ok,
        }
    }
}

export enum TOKEN_EXCEPTION {
    COUNT_UNDEFINED= `error.token.count_undefined`,
    LOW_COUNT = `error.token.low_count`,
}

export enum IMAGE_EXCEPTION {
    SERVICE= `error.image.service.failed`,
    INVALID_PROMPT= `error.image.prompt.invalid`,
    IMAGE_TRIAL_COUNT = `error.image.over_trial_count`,
    IMAGE_FEATURE_NOT_IN_SUBSCRIPTION = `error.image.feature_not_supported`,
}

export enum TEXT_EXCEPTION {
    TEXT_FEATURE_NOT_IN_SUBSCRIPTION = `error.text.feature_not_supported`,
    TRIAL_OVER = `error.text.trial_over`,
}

export enum SUBSCRIPTION_EXCEPTION {
    NOT_FOUND= `error.subscription.not_found`,
}

export const TokenExceptionLowCount = new ExceptionWithCode ({
    message: `Low token count`,
    code: TOKEN_EXCEPTION.LOW_COUNT
});

export const ImageExceptionOverTrialCount = new ExceptionWithCode ({
    message: `Image generated limit`,
    code: IMAGE_EXCEPTION.IMAGE_TRIAL_COUNT
});

export const ImageExceptionFeatureNotInSubscription= new ExceptionWithCode ({
    message: `Image feature is not in this subscription product`,
    code: IMAGE_EXCEPTION.IMAGE_FEATURE_NOT_IN_SUBSCRIPTION
});

export const TextExceptionTrialOver= new ExceptionWithCode ({
    message: `Trial is over, cannot generate text`,
    code: TEXT_EXCEPTION.TRIAL_OVER
});

export const TextExceptionFeatureNotInSubscription= new ExceptionWithCode ({
    message: `Text feature is not in this subscription product`,
    code: TEXT_EXCEPTION.TEXT_FEATURE_NOT_IN_SUBSCRIPTION
});

export const TokenExceptionCountUndefined = new ExceptionWithCode ({
    message: `Not able to read current token count`,
    code: TOKEN_EXCEPTION.COUNT_UNDEFINED
});

// In case something went wrong with our partner API
export const ImageGenerationExceptionService = new ExceptionWithCode({
    message: `Something went wrong with image generation`,
    code: IMAGE_EXCEPTION.SERVICE
})

// User inserted incorrect prompt (nsfw,...)
export const ImageGenerationInvalidPromptException= new ExceptionWithCode({
    message: `Invalid prompt`,
    code: IMAGE_EXCEPTION.INVALID_PROMPT
})

export const NoSubscriptionExceptionException= new ExceptionWithCode({
    message: `Subscription not found`,
    code: SUBSCRIPTION_EXCEPTION.NOT_FOUND
})
