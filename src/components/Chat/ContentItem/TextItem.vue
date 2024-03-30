<script setup lang="ts">
import Spinner from "@/components/atoms/Spinner/Spinner.vue";

const {content} = defineProps<{
  content: string,
}>();

</script>

<template>
  <div class="text-item d-flex flex-column align-left w-full">
    <div class="d-flex flex-row">
      <p v-if="content" class="text-left w-full" v-html="content"/>
      <Spinner v-else
               class="mx-3"
               size="sm"
               color="primary"/>
    </div>
  </div>
</template>

<style lang="scss">
.text-item {
  pre code {
    display: block;
    padding: 20px;
    border-radius: 10px;
  }

  p {
    margin: 0;
  }
}
</style>