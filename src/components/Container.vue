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
    <Assistant v-if="isAssistantOpen" @close="isAssistantOpen=false"/>
    <TriggerButton v-else @click="handleClick"/>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.assistant-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
