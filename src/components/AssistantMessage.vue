<script setup>
  const props = defineProps({
    message: String,
  })
</script>

<template>
  <div class="assistant-message">
   {{ message }}
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.assistant {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
