<script setup>
import Container from './components/Container.vue'
import {useChatStore} from "@/store/chat";
import {onMounted} from "vue";

const chatStore = useChatStore();

onMounted(async () => {
  await Promise.all([
    chatStore.subscribeResponse(),
    chatStore.getChatList(),
  ]);
})
</script>

<template>
  <div class="app">
    <Container/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
