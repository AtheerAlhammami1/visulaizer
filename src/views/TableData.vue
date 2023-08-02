<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th></th>
        <th v-for="item in table_Colum">{{ item }}</th>
      </tr>
      </thead>
      <!-- head -->
      <tbody>
      <!-- row 1 -->
      <tr v-for="(item, index) in table_Data" :key="index" class="hover">
        <td v-for="(value, key) in item" :key="key">
          {{ value }}
        </td>
      </tr>
      <!-- row 1 -->
      </tbody>
    </table>
  </div>
</template>
<script setup>
const props = defineProps({
  table_Colum :{
    type : Array ,
    required : true
  },
  table_Data :{
    type : Array ,
    required : true
  }
})
</script>
<style>
.table {
  position: unset;
}
</style>