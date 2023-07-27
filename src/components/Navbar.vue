<script setup>
import Modal from "@/components/Modal.vue";
import InputText from "@/components/InputText.vue";
import {ref} from "vue";
import DropDown from "@/components/DropDown.vue";

function toggletheme(){
  const currentTheme = localStorage.getItem('theme');
  // Toggle between "light" and "dark" themes
  const newTheme = currentTheme === 'light' ? 'synthwave' : 'light';
  // Set the new theme in localStorage
  localStorage.setItem('theme', newTheme);

  document.querySelector('html').setAttribute('data-theme', newTheme);

}
const entityTypeOptions = ['Aircraft' , 'Person' , 'Vehicle ']
const entityClassifiction = ['Friend' , 'Hostile']

let sam = ref()
</script>
<template>

<div class="lg:absolute  h-20 w-40">
  <div class="drawer p-4">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer" class="btn btn-circle swap swap-rotate">
        <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
      </label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content flex flex-col items-center justify-between">
        <img class="bg-white p-3 mt-7 rounded" src="https://wakeb.tech/front/images/logo.png" alt="Wakeb Logo" >

        <div class="flex flex-col items-center justify-center flex-grow">
          <li>
            <a onclick="my_modal_1.showModal()" class="flex items-center justify-center text-lg font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>

              Scenarios
            </a>
          </li>

        </div>
      </ul>


    </div>
  </div>
</div>

  <div class="navbar bg-base-100">
    <div class="navbar-center">
          <li>
            Scenario Builder
          </li>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal drop-shadow-2xl px-1">

        <li class="font-bold text-lg">
          Scenario Builder
        </li>

      </ul>
    </div>
    <div class="navbar-end">
      <label class="swap swap-rotate" >

        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" @click="toggletheme" />

        <!-- sun icon -->
        <svg class="swap-off fill-current w-11 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>

        <!-- moon icon -->
        <svg class="swap-on fill-current w-11 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

      </label>
    </div>
  </div>


  <Modal modalId="my_modal_1" modalTitle="Create Scenario" SubmitText="Next" Event="my_modal_2.showModal()" :Progress="1" >
    <InputText  v-model="sam" label="Scenario Name" placeHolder="Enter Scenario name"/>
  </Modal>


  <Modal  modalId="my_modal_2" modalTitle="Create Entity" SubmitText="Next" Event="my_modal_3.showModal()" :Progress="2">
  <InputText label="Entity Name" placeHolder="Enter Entity name"/>
    <DropDown :Options="entityTypeOptions" label="Entity Type" placeHolder="Pick One" />
    <DropDown :Options="entityClassifiction" label="Entity Classifiction" placeHolder="Chose One" />
    <div class="bg-red-700 w-2/4 h-40 flex justify-center items-center ml-20 mt-7 ">
      dsa
    </div>
    <p class="flex justify-start py-3">
      NATO SIDC :
    </p>
  </Modal>

  <Modal modalId="my_modal_3" modalTitle="Create s" SubmitText="s" :Progress="3">
    <InputText label="s Name" placeHolder="Enter s name"/>
  </Modal>



</template>
