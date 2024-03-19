<script setup>

</script>

<template>
  <button class="assistant-button">
    <img class="assistant-button__icon" src="../assets/button-icon.png" alt=""/>
    Asistent výběru zboží
  </button>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.assistant-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px 10px 20px;
  background: var(--color-primary);
  transition: all 0.15s;
  border: 3px solid white;
  border-radius: 30px;
  box-shadow: 0 0 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: var(--color-primary);
  }

  &__icon {
    height: 24px;
    margin-right: 5px;
  }
}
</style>
