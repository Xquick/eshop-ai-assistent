<script setup lang="ts">
import AssistantMessage from "@/components/AssistantMessage.vue";
import {useGenerateContent} from "@/composables/useGenerateContent";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useChatStore} from "@/store/chat.ts";

const {generateContentByType} = useGenerateContent();
const chatStore = useChatStore();

const {getMessagesByChatId} = chatStore;
const {messagesByChatId} = storeToRefs(chatStore);
const input = ref<HTMLInputElement>();
const chatId = 1;
const onSubmit = async () => {
  await generateContentByType(chatId, {
    promptText: input.value.value,
  })
}

onMounted(() => {
  getMessagesByChatId(`1`);
  console.log('messagesByChatId', messagesByChatId);
})

</script>

<template>
  <div class="assistant">
    <div class="assistant__close" @click="$emit('close')">x</div>
    <div>
      <AssistantMessage v-for="message in messagesByChatId[1]" :message="message.content"/>
    </div>

    <div class="assistant__input w-full">
      <form @submit.prevent="onSubmit">
        <input ref="input" class="w-full"/>
        <button type="submit" class="assistant__submit">
          <img src="../assets/arrow.png" alt=""/>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.assistant {
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 300px;
  min-width: 500px;
  padding: 20px 30px;
  background: white;
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

  &__submit {
    position: absolute;
    top: 5px;
    right: 6px;
    height: calc(100% - 10px);
    background: var(--color-primary);
    padding: 10px;
    border-radius: 10px;

    img {
      height: 15px;
    }
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
