<script setup>
import Modal from "@/components/Modal.vue";
import InputText from "@/components/InputText.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import {ref} from "vue";

function toggletheme(){
  const currentTheme = localStorage.getItem('theme');
  // Toggle between "light" and "dark" themes
  const newTheme = currentTheme === 'light' ? 'synthwave' : 'light';
  // Set the new theme in localStorage
  localStorage.setItem('theme', newTheme);

  document.querySelector('html').setAttribute('data-theme', newTheme);

}
let sam = ref('')
</script>
<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 drop-shadow-2xl bg-base-100 rounded-box w-52">

          <li>
            <a class="font-bold">Scenarios</a>
            <ul class="p-2">
              <li>
                <a  onclick="my_modal_1.showModal()">
                  Create new Scenario
                </a>
              </li>

            </ul>
          </li>

        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl">Scenario builder </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal drop-shadow-2xl px-1">

        <li tabindex="0" class="">
          <details>
            <summary class="font-bold text-lg ">Scenarios</summary>
            <ul class="p-2 font-bold">
              <li>
                <a onclick="my_modal_1.showModal()">Create new Scenario</a>
              </li>
            </ul>
          </details>
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


  <Modal modalId="my_modal_1" modalTitle="Create Scenario" SubmitText="Sm" Event="my_modal_2.showModal()" >
    <InputText  v-model="sam" label="Scenario Name" placeHolder="Enter Scenario name"/>
  </Modal>


  <Modal modalId="my_modal_2" modalTitle="Create Entity" SubmitText="Next" Event="my_modal_3.showModal()">
  <InputText label="Scenario Name" placeHolder="Enter Scenario name"/>
  </Modal>

  <Modal modalId="my_modal_3" modalTitle="Create s" SubmitText="s">
    <InputText label="s Name" placeHolder="Enter s name"/>
  </Modal>
</template>
