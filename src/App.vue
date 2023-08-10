<script setup>
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue'

onMounted(() => {
  let theme = 'synthwave'
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme')
  } else {
    localStorage.setItem('theme', theme)
  }
  document.querySelector('html').setAttribute('data-theme', theme)
})
</script>

<template>
  <Navbar />
  <RouterView />
</template>
