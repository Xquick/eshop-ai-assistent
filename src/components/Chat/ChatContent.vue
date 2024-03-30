<script setup lang="ts">

import {onMounted, ref, watch} from "vue";

import ContentItem from "@/components/Chat/ContentItem/ContentItem.vue";
import ChatContentEmpty from "@/components/Chat/ChatContentEmpty.vue";

const scrollAnchor = ref();
const content = ref();
const { messages } = defineProps<{
  messages: []
}>()

const scrollDown = () => {
  content.value.scrollTo({
    top: 1000000,
    // @ts-ignore
    behavior: 'instant'
  })
}

watch(messages, () => {
  scrollDown();
})

onMounted(async () => {
  scrollDown();
})


</script>

<template>
  <div ref="content" class="content-wrapper">
    <template v-for="(message, index) in messages">
      <ContentItem
          :role="message.role"
          :id="message.id"
          :content="message.content"/>
    </template>

    <ChatContentEmpty
        v-if="messages?.length === 0"/>

    <div id="anchor" ref="scrollAnchor"></div>
  </div>
</template>

<style lang="scss">
.chat-content {
  &__skeleton {
    margin: 20px;
    width: calc(100% - 40px) !important;
    height: 50vh !important;
  }

  &__fog {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(58, 57, 57, 0.29);
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}

.content-wrapper {
  height: 100vh;
  max-height: 100%;
  border: none;
  width: 100%;
  overflow: scroll;
  padding-bottom: 50px;

  li {
    cursor: text;
  }

  #anchor {
    overflow-anchor: auto;
    min-height: 80px;
    height: 80px;
    width: 100%;
  }

  * {
    overflow-anchor: none;
  }

  .no-response {
    font-size: 32px;
    color: rgba(208, 205, 205, 0.41);
    font-weight: 600;
  }

  @media(max-width: 768px) {
    padding-top: 50px;
  }
}

</style>