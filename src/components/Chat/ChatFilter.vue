<script setup lang="ts">
import {ref, watch} from 'vue';
import {CButton, CFormCheck, CFormInput} from "@coreui/vue";

export interface ChatFilterItem {
  value: string,
  active: boolean
}

const {name, options} = defineProps<{
  name: string,
  options: Array<any>,
}>();

const emit = defineEmits(['update:modelValue']);

const filterItem = defineModel();

// Dropdown state
const isOpen = ref(false);

// Toggle dropdown
const toggleDropdown = () => {
  setTimeout(() => {
    isOpen.value = !isOpen.value;
  }, 10)
};

const handleClick = (item) => {
  isOpen.value = false;
  emit('update:modelValue', { value: item, active: true })
};

const closeFilter = () => {
  if (isOpen.value === true) {
    isOpen.value = false;
  }
}

</script>

<template>
  <div class="chat-filter"
       v-click-out-side="closeFilter"
  >
    <CButton color="primary"
             :class="{
                'active': filterItem.active
              }"
             class="chat-filter__button"
             @click.stop="toggleDropdown">
      <CFormCheck
          @click.stop=""
          v-model="filterItem.active"
      />
      <span class="chat-filter__key">{{ $t(`filter.name.${name}`) }}</span>:&nbsp;
      <span class="chat-filter__value">{{ $t(`filter.value.${filterItem.value}`) }}</span>
    </CButton>

    <CFormInput
        :name="name"
        v-model="filterItem"
        hidden
    />

    <div id="dropdownMenu" class="chat-filter__content" v-if="isOpen">
      <div class="option"
           v-for="(option, index) in options" :key="index"
           @click="handleClick(option)">
        {{$t(`filter.value.${option}`)}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-filter {
  position: relative;
  display: inline-block;

  &__key {
    opacity: 0.9;
  }

  &__value {
    font-weight: 600;
  }

  &__button {
    color: white;
    margin-right: 5px;
    padding: 5px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    background: var(--cui-primary);
    opacity: 0.6;
    text-decoration: line-through;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .form-check-input {
      margin: 0;
      margin-right: 5px;
      width: 18px;
      height: 18px;

      &:checked {
        background: white;

        &[type=checkbox] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='rgba%2820, 20, 20, 0.87%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
        }
      }
    }

    &.active {
      opacity: 1;
      background: var(--cui-primary);
      text-decoration: none;
    }
  }

  &__content {
    position: absolute;
    bottom: 100%;
    z-index: 1;
    min-width: calc(100% - 5px);
    background: white;
    box-shadow: 0 0 16px 0 rgb(138 138 138 / 12%);
    border-radius: 20px;
    margin-bottom: 10px;
    overflow: hidden;

    .option {
      color: #2a2a2a;
      text-decoration: none;
      padding: 8px 20px;
      display: block;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(236, 236, 236, 0.64);
      }

      &:hover {
        background-color: var(--cui-primary);
        color: white;
      }
    }
  }
}



</style>