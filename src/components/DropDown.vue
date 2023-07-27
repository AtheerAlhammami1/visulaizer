<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text" >{{ label }}</span>
    </label>
    <select class="select select-bordered">
      <option disabled selected>{{ placeHolder }}</option>
      <option v-for="item in Options">{{ item }}</option>
    </select>
  </div>
</template>
<script setup>
const props = defineProps({
  label : String,
  placeHolder :String,
  Options : Array,
})
</script>