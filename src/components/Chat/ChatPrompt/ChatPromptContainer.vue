<script setup lang="ts">

import {ref} from "vue";
import ChatPrompt from "@/components/Chat/ChatPrompt/ChatPrompt.vue";

const content = ref('');
const style = ref('');
defineEmits(['promptSent']);

const {threadId} = defineProps<{
  threadId: string,
}>();

</script>

<template>
  <div class="chat-prompt-container"
       :key="threadId"
  >
    <ChatPrompt
        class="chat-prompt-container__prompt"
        @prompt-sent="$emit('promptSent', $event)"
        :threadId="threadId"/>
    <div class="chat-prompt-container__fog"></div>
  </div>
</template>

<style lang="scss">

.chat-prompt-container {
  $maxWidth: 900px;
  max-width: $maxWidth;

  .no-access-image {
    max-height: 250px;
  }

  &__prompt {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 20px;
    width: calc(100% - 60px);
  }

  &__skeleton {
    height: 50px;
    margin: 20px;
    width: calc(100% - 40px) !important;
    border-radius: 25px !important;
  }

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
  }
}
</style>