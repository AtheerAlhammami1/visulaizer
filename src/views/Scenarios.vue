<script setup>

import Calendar from 'primevue/calendar';
import InputText from "@/components/Inputs/InputText.vue";
import DropDown from "@/components/Inputs/DropDown.vue";
import Modal from "@/components/Modal.vue";
import milsymbol from "milsymbol";
import { ref} from 'vue';


const table_Data   = [
  {
    id : 1 ,
    scenario_Name : "Alqassim",
    Number_of_entities : 15 ,
    Number_of_waypoint : 45 ,
    Duration : "1 hour"

  },
  {
    id : 1 ,
    scenario_Name : "Alqassim",
    Number_of_entities : 15 ,
    Number_of_waypoint : 45 ,
    Duration : "1 hour"

  },
  {
    id : 1 ,
    scenario_Name : "Alqassim",
    Number_of_entities : 15 ,
    Number_of_waypoint : 45 ,
    Duration : "1 hour"

  },
  {
    id : 1 ,
    scenario_Name : "Alqassim",
    Number_of_entities : 15 ,
    Number_of_waypoint : 45 ,
    Duration : "1 hour"

  }
]
const entityType = [
  {
    name : "Aircraft" ,
    SIDC : "121900"
  },
  {
    name : "Infantry" ,
    SIDC : "121100"
  },
  {
    name : "Tank" ,
    SIDC : "120500"
  },
]
const entityClassification = [
  {
    name : "Pending",
    SIDC : "0"
  },
  {
    name : "Unknown",
    SIDC : "1"
  },
  {
    name : "Assumed Friend",
    SIDC : "2"
  },
  {
    name : "Friend",
    SIDC : "3"
  },
  {
    name : "Natural",
    SIDC : "4"
  },
  {
    name : "Subsect/Joker",
    SIDC : "5"
  },
  {
    name : "Hostile/Faker",
    SIDC : "6"
  },

]
const selectedEntityType = ref('Select Entity Type')
const selectedEntityClassification = ref('Select Classification type')
let natoSIDC = '300310000012110000000';

function setNatoClassification(Num){
  natoSIDC = natoSIDC.slice(0, 3) + Num + natoSIDC.slice(3 + Num.toString().length);
}
function setNatoType(Num){
  natoSIDC = natoSIDC.slice(0, 10) + Num + natoSIDC.slice(10 + Num.toString().length);
}
function getSIDC(entityArray, name) {
  const entity = entityArray.find(entity => entity.name === name);
  return entity ? entity.SIDC : null;//change
}


const iconCanvas = ref(null);

function natoSymbologyGenerator() {
  const canvas = iconCanvas.value;
  const canvasContext = canvas.getContext('2d');
  canvas.width = 160;
  canvas.height = 160;

  setNatoClassification( getSIDC(entityClassification ,selectedEntityClassification.value))
  setNatoType( getSIDC(entityType ,selectedEntityType.value))
  printNatoSymbologyGenerator();
  const natoIcon = new milsymbol.Symbol(natoSIDC);
  const svgString = natoIcon.asSVG();
  const canvasImage = new Image();

  canvasImage.onload = () => {
    canvasContext.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
  };

  canvasImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}
function printNatoSymbologyGenerator(){
  console.log(getSIDC(entityType ,selectedEntityType.value))
  console.log(getSIDC(entityClassification ,selectedEntityClassification.value))
  console.log(natoSIDC)
}
const table_Column = ['Scenario Name' , 'Number of entities' , 'Number of waypoint' , 'Duration' ,'Action']

</script>



<template>

  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th></th>
        <th v-for="item in table_Column">{{ item }}</th>
      </tr>
      </thead>
      <!-- head -->
      <tbody>
      <!-- row 1 -->
      <tr v-for="item in table_Data" class="hover">
        <th>{{ item.id }}</th>
        <td>{{ item.scenario_Name }}</td>
        <td>{{ item.Number_of_entities }}</td>
        <td>{{ item.Number_of_waypoint }}</td>
        <td>{{ item.Duration }}</td>
        <td class="">
          <button class="btn btn-neutral">
            Modify
          </button>
        </td>

      </tr>
      <!-- row 1 -->
      </tbody>
    </table>
  </div>


  <button class="btn btn-block flex justify-center"   onclick="my_modal_1.showModal()"> Add Scenario</button>




  <Modal modalId="my_modal_1" modalTitle="Create Scenario" SubmitText="Next" Event="my_modal_2.showModal()" :Progress="1" >
    <InputText  label="Scenario Name" placeHolder="Enter Scenario name"/>
  </Modal>



  <Modal  modalId="my_modal_2" modalTitle="Create Entity" SubmitText="Next" Event="my_modal_3.showModal()" :Progress="2">
    <InputText label="Entity Name" placeHolder="Enter Entity name"/>
    <DropDown @click="natoSymbologyGenerator" v-model="selectedEntityType" :Options="entityType" label="Entity Type" placeHolder="Pick One" />
    <DropDown @click="natoSymbologyGenerator" v-model="selectedEntityClassification"  :Options="entityClassification" label="Entity Classification" placeHolder="Chose One" />
    <div class="flex flex justify-center mt-5">
      <canvas ref="iconCanvas"/>
    </div>
    <p class="text-center mt-5"> Nato SIDC : {{natoSIDC}}</p>
  </Modal>

  <Modal modalId="my_modal_3" modalTitle="Create s" SubmitText="s" :Progress="3">
    <InputText label="s Name" placeHolder="Enter s name"/>
  </Modal>
</template>


<style>
.table{
  position:unset;
}
</style>