import {reactive} from "vue";
import {useChatStore} from "@/store/chat.ts";
import {getHttpAIStream} from "@/services/http.service.ts";
import {storeToRefs} from "pinia";

const generatedData = reactive({
    error: '',
});

export interface IGeneratingProgress {
    content: boolean,
    suggestions: boolean
}

export function useGenerateContent() {
    const chatStore = useChatStore();
    const {messagesByChatId, generatingInProgress} = storeToRefs(chatStore);

    const stopGenerating = (chatId: string) => {
        generatingInProgress.value[chatId].content = false;
        generatingInProgress.value[chatId].suggestions = false;
    }

    const generateResponse = async (chatId, {
        promptText
    }) => {
        generatingInProgress.value[chatId] = {
            content: true,
            suggestions: false
        };

        const {response_id: responseId} = await chatStore.createPromptByChatId(chatId, {
            promptText
        });

        const messages = messagesByChatId.value[chatId]
            .map((message) => ({content: message.content, role: message.role}));

        return generateText(chatId, responseId, {
            messages
        })
    }


    const generateText = async (chatId, responseId, {
        messages
    }) => {
        const onInit = () => {
        };

        const onIteration = (chunk: string, {isSuggestionChunk} = {isSuggestionChunk: false}) => {
            chatStore.updateLatestResponse({
                chatId,
                status: null,
                responseChunk: chunk,
                increment: true,
            });

            return generatingInProgress.value[chatId].content
        };

        const onFinished = async () => {
            generatingInProgress.value[chatId].content = false;
        }

        const onError = (e) => {
            generatedData.error = e.code;
            generatingInProgress.value[chatId].content = false;
        }

        return getHttpAIStream(
            {messages, responseId},
            onInit,
            onIteration,
            onFinished,
            onError
        );
    }


    return {
        generateContentByType: generateResponse,
        generateText,
        generatingInProgress,
        generatedData,
        stopGenerating,
    }
}
