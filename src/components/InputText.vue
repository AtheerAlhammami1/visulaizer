<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input type="text" :placeholder="props.placeHolder" class="input input-bordered w-full max-w-xs"/>
  </div>
</template>
<script setup>
const props = defineProps({
  label : String,
  placeHolder : String
})
</script>