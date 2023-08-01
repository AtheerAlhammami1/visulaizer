<script setup>
import Navbar from './components/Navbar.vue'
import {onMounted} from 'vue'

onMounted( () => {
  let theme = "synthwave"
  if(localStorage.getItem("theme")){
    theme = localStorage.getItem("theme");
  }else{
    localStorage.setItem("theme",theme)
  }

  // if(!document.querySelector('html').getAttribute('data-theme').length){
  console.error(theme)
    document.querySelector('html').setAttribute('data-theme', theme);
  // }

})


// let theme = document.querySelector('html').getAttribute('data-theme');
// localStorage.setItem('theme' , theme)


</script>

<template>
  <Navbar/>
  <RouterView />
</template>

