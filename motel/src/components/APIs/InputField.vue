<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps(["label", "type", "placeholder", "modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-floating mb-3">
      <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      />
      <label class="form-label">{{ props.label }}</label>
  </div>
</template>
