<script setup lang="ts">
import {onMounted, provide, ref} from "vue";
import Chat from "@/components/Chat/Chat.vue";
import {createMessage, createThread, listMessages} from "@/services/http.service.ts";
import {useGtag} from "vue-gtag-next";

const input = ref<HTMLInputElement>();

const threadId = ref();

const messages = ref([]);
const {event} = useGtag();

const onPromptSent = async (message: string) => {
  messages.value.push({
    content: message,
    role: 'user'
  });

  messages.value.push({
    content: '',
    role: 'assistant'
  });

  await createMessage(threadId.value, message, (textChunk) => {
    messages.value[messages.value.length - 1].content += textChunk;
  });

  event('generate_text', {
    'event_category': 'generate',
    'event_label': 'text'
  })
}

onMounted(async () => {
  let localThreadId = localStorage.getItem('blueai_thread_id');

  if (!localThreadId) {
    const response = await createThread();
    const responseData = await response.json();
    localThreadId = responseData.thread_id;

    localStorage.setItem('blueai_thread_id', localThreadId);
  }

  threadId.value = localThreadId;

  const response = await listMessages(threadId.value);
  const messagesResponse = await response.json();

  messages.value = messagesResponse.data.map((messageItem) => {
    return {
      content: messageItem.content[0].text.value,
      role: messageItem.role
    }
  });
})

</script>

<template>
  <div class="assistant">
    <div class="assistant__close" @click="$emit('close')">x</div>
    <Chat
        :thread-id="threadId"
        :messages="messages"
        @prompt-sent="onPromptSent"/>
  </div>
</template>

<style scoped lang="scss">
.assistant {
  position: relative;
  background: white;
  overflow: hidden;
  transition: all 0.15s;
  border: 3px solid var(--color-primary);
  border-radius: 30px;
  box-shadow: 0 0 15px -3px rgba(0, 0, 0, 0.1);

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  &__input {
    position: relative;
    width: 100%;
    margin-top: auto;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 10px;

    input {
      outline: none;
    }
  }
}
</style>
