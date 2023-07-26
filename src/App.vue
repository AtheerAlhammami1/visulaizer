<script setup>
import Navbar from './components/Navbar.vue'
if(!localStorage.length){
  alert('s')
  localStorage.setItem('theme' , 'synthwave')
}
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>

