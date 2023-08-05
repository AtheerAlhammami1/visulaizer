<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text" >{{ label }}</span>
    </label>
    <select :value="modelValue" @input="updateValue"  class="select select-bordered">
      <option disabled selected>{{ modelValue }}</option>
      <option  v-for="item in Options">{{ item }}</option>
    </select>
  </div>
</template>
<script setup>

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

const props = defineProps({
  label : String,
  placeHolder :String,
  Options : Array,
  modelValue: String
})
</script>