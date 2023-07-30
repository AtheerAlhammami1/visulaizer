<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input :value="modelValue" @input="updateValue" type="text" :placeholder="props.placeHolder" class="input input-bordered w-full max-w-xs"/>
  </div>
</template>
<script setup>
const props = defineProps({
  label : String,
  placeHolder : String,
  modelValue: String
})

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>