<script setup>
import TriggerButton from "@/components/TriggerButton.vue";
import Assistant from "@/components/Assistant.vue";
import {ref} from "vue";

const handleClick = () => {
  isAssistantOpen.value = true;
}

let isAssistantOpen = ref(false);

</script>

<template>
  <div class="assistant-container">
    <Assistant class="assistant-container__content" v-if="isAssistantOpen" @close="isAssistantOpen=false"/>
    <TriggerButton v-else @click="handleClick"/>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.assistant-container {
  position: fixed;
  bottom: 0;
  right: 0;
  max-height: 100vh;
  padding-bottom: 30px;
  padding-right: 30px;

  &__content {
    width: 900px;
    height: calc(100vh - 100px);
    max-width: calc(100vw - 100px);
  }
}
</style>
