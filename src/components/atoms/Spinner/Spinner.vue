<script setup lang="ts">
  const { size, color } = defineProps<{
    size: {
      type: string,
      default: 'sm'
    },
    color: string
  }>();
</script>

<template>
  <div class="lds-ring spinner"
       :class="[`spinner--size-${size}`, `spinner--color-${color}`]"
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
$size: 20px;
.spinner {
  --spinner-color: #fff;

  &--size {
    &-sm {
      --spinner-size: 20px;
      --spinner-thickness: 2px;
    }
    &-md {
      --spinner-size: 40px;
      --spinner-thickness: 4px;
    }
    &-lg {
      --spinner-size: 60px;
      --spinner-thickness: 6px;
    }
  }
  &--color {
    &-primary {
      --spinner-color: var(--cui-primary);
    }
  }
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: var(--spinner-size);
  height: var(--spinner-size);
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: calc(var(--spinner-size) + var(--spinner-thickness));
  height: calc(var(--spinner-size) + var(--spinner-thickness));
  margin-top: 2px;
  border: var(--spinner-thickness) solid var(--spinner-color);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--spinner-color) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>