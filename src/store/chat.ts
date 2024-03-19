import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getMessagesByChatIdFromDB, subscribeToChatResponse, supabase} from "@/supabase.ts";
import {Ref} from "vue/dist/vue";
import {IGeneratingProgress} from "@/composables/useGenerateContent.ts";
import {Status} from "@/model/general.ts";

export enum OpenAIRole {
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
    USER = 'user',
}

export interface IOpenAIMessages {
    role: OpenAIRole.USER | OpenAIRole.SYSTEM | OpenAIRole.ASSISTANT,
    content: string,
}

export interface ILocalMessage {
    role: OpenAIRole.USER | OpenAIRole.SYSTEM | OpenAIRole.ASSISTANT,
    content: string,
}

/**
 * Update prompt text - used for example for suggestions (user clicks on in and changes Text in prompt)
 */
const promptInputHandler = {
    callbackInstances: {},
    update (prompt) {
        Object.values(this.callbackInstances).forEach(f => f(prompt))
    },
    register(f: (prompt: string) => void, id) {
        this.callbackInstances[id] = f;
    }
}

export const useChatStore = defineStore('chat', () => {
    const generatingInProgress = ref<{ [key: string]: Ref<IGeneratingProgress>}>({});
    const messagesByChatId = ref<{ [key: string]: any }>({});
    const chatList = ref<{ [key: string]: any }>([]);
    const filterListByContentType = ref({});
    const newResponseNotifier = ref('');

    const submitSuggestion = (suggestion: string) => {
        promptInputHandler.update(suggestion);
    }

    const getMessagesByChatId = async (chatId: string) => {
        const response = await getMessagesByChatIdFromDB(chatId);

        messagesByChatId.value[chatId] = response.data.reduce((acc, curr) => {
            acc.push({
                content: curr.text,
                role: OpenAIRole.USER
            })

            let suggestions = [];

            try {
                suggestions = JSON.parse(curr.chat_response.suggestions)?.suggestions;
            } catch(e) {
                console.log(e);
            }

            acc.push({
                // @ts-ignore
                id: curr.chat_response.id,
                content: curr.chat_response.text,
                feedbackOk: curr.chat_response.feedback_ok,
                status: curr.chat_response.status,
                role: OpenAIRole.ASSISTANT,
                suggestions
            })

            return acc;
        }, []);
    }

    const createPromptByChatId = async (chatId, {
        promptText
    }) => {
        const {data: createPromptResponse} = await supabase.rpc('create_chat_prompt', {
            chat_id_input: chatId,
            content_input: promptText,
        })
            .single();

        await getMessagesByChatId(chatId);

        return createPromptResponse;
    }

    /**
     * Updates local version of response - DB is updated from backend
     * @param chatId
     * @param responseChunk - message increment
     * @param status
     * @param replaceContent
     */
    const updateLatestResponse = async ({
                                            chatId,
                                            responseChunk,
                                            status,
                                            increment = false
                                        }) => {
        const latestResponse = getLatestResponseByChatId(chatId);

        updateResponse(latestResponse, {
            responseChunk,
            status,
            increment
        });
    }

    const updateResponseById = async ({
                                          chatId,
                                          responseId,
                                          responseChunk,
                                          status,
                                          increment = false,
                                      }) => {
        const chatResponse = messagesByChatId.value[chatId]?.find((message) => message.id === responseId);

        if (!chatResponse) return;

        updateResponse(chatResponse, {
            responseChunk,
            status,
            increment
        });
    }

    const updateResponse = (response, {
        responseChunk,
        suggestions = [],
        status = Status.SUCCESS,
        increment = false,
    }) => {
        response.status = status;
        response.suggestions = suggestions;

        if (increment) {
            response.content += responseChunk;
        } else {
            response.content = responseChunk;
        }

        console.log('response', response);
    }

    const getLatestResponseByChatId = (chatId) => {
        const messageCountInChat = messagesByChatId.value[chatId].length - 1;

        return messagesByChatId.value[chatId][messageCountInChat];
    }

    const createNewChat = async (contentType: string) => {
        const {data: {user: {id}}} = await supabase.auth.getUser();

        return supabase
            .from('chat')
            .insert({
                uid: id,
                name: `contentType.${contentType}`
            })
            .select('id')
            .single()
    }

    const renameChatById = async (chatId: string, newName: string) => {
        const chatToRename = chatList.value.find((chat) => chat.id === parseInt(chatId))

        chatToRename.name = newName;

        return supabase
            .from('chat')
            .update({
                name: newName,
            })
            .eq('id', chatId)
    }

    const getChatList = async () => {
        const response = await supabase
            .from('chat')
            .select('id,created_at,name,content_type(type, active)')
            .order('created_at', {ascending: false})

        console.log(response);
        chatList.value = response.data;
    }

    const getChatListById = (chatId: number) => {
        return computed(() =>
            chatList.value.find((chat) => chat.id === chatId))
    }

    const deleteChatById = async (chatId: number) => {
        await supabase
            .from('chat')
            .delete()
            .eq('id', chatId);

        await getChatList();
    }

    const subscribeResponse = async () => {
        const onChangeCallback = (responsePayload) => {
            const newResponse = responsePayload.new;

            console.log('responsePayload', responsePayload);
            updateResponseById({
                chatId: newResponse.chat_id,
                responseId: newResponse.id,
                status: newResponse.status,
                responseChunk: newResponse.text,
            })
        }

        await subscribeToChatResponse(onChangeCallback);
    }

    const setMessageFeedbackById = (chatId: number, responseId: number, feedbackOk: boolean) => {
        const message = messagesByChatId.value[chatId].find(message => message.id === responseId);

        message.feedbackOk = feedbackOk;
        console.log('message', message);
    }

    // @ts-ignore
    return {
        newResponseNotifier,
        messagesByChatId,
        chatList,
        filterListByContentType,
        generatingInProgress,
        promptInputHandler,

        submitSuggestion,
        renameChatById,
        getMessagesByChatId,
        getChatList,
        getChatListById,
        createNewChat,
        deleteChatById,
        createPromptByChatId,
        updateLatestResponse,
        subscribeResponse,
        setMessageFeedbackById
    }
})
