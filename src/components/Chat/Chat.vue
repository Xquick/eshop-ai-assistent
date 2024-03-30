<script setup lang="ts">
import ChatPromptContainer from "@/components/Chat/ChatPrompt/ChatPromptContainer.vue";
import ChatContent from "@/components/Chat/ChatContent.vue";
import {inject} from "vue";


const threadId = inject('threadId') as string;
const { messages } = defineProps<{
  messages: [],
}>()

</script>

<template>
  <ChatContent :key="threadId" :messages="messages"/>
  <ChatPromptContainer
      @prompt-sent="$emit('promptSent', $event)"
      :key="threadId" :threadId="threadId"/>
</template>

<style scoped lang="scss">

</style>