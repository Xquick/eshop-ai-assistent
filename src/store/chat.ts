import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {subscribeToChatResponse, supabase} from "@/supabase.ts";
import {Ref} from "vue/dist/vue";
import {Status} from "@/model/general.ts";

export enum OpenAIRole {
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
    USER = 'user',
}

export const useChatStore = defineStore('chat', () => {
    const generatingInProgress = ref<{ [key: string]: Ref<IGeneratingProgress>}>({});
    const messagesByThreadId = ref<{ [key: string]: any }>({});

    // @ts-ignore
    return {
        messagesByThreadId,
        generatingInProgress,
    }
})
