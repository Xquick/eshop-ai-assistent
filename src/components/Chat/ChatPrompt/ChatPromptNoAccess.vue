<script setup lang="ts">
  const { header, text, buttonText } = defineProps<{
    header: string,
    text: string,
    buttonText: string,
    submitAction: () => {}
  }>();
</script>

<template>
  <div class="chat-prompt-no-access d-flex flex-column align-items-center">
    <h3 class="my-2" v-html="header"/>
    <slot />
    <p class="my-3 text-center" v-html="text"/>
    <CButton
        color="primary"
        class="no-access"
        size="lg"
        @click="$router.push({ name: 'introSubscription' })"
    >{{ buttonText }}
    </CButton>
  </div>
  <div class="chat-prompt-no-access__fog" />
</template>

<style lang="scss">
  .chat-prompt-no-access {
    position: absolute;
    bottom: 20px;
    width: 100%;
    z-index: 120;
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 14px -2px rgba(0, 0, 0, 0.1);

    &__fog {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 119;
      background: rgba(0,0,0,0.1);
      width: 100vw;
      height: 100vh;
      pointer-events: none;
    }

    @media(max-width: 768px) {
      width: 100%;
    }
  }

</style>
