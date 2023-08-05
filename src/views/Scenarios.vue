<script setup>
//--------------------------IMPORT-------------------------------------
import InputText from "@/components/Inputs/InputText.vue";
import DropDown from "@/components/Inputs/DropDown.vue";
import Modal from "@/components/Modal.vue";
import milsymbol from "milsymbol";
import {ref} from 'vue';
import TableData from "@/views/TableData.vue";
//---------------------------------------------------------------


//--------------------------Variables-------------------------------------
const table_Column = ['Scenario Name' , 'Number of entities' , 'Number of waypoint' , 'Duration' ,'Action']
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
//-------------------------------------------------------------------------

const entityType = {
  Aircraft :121900,
  Infantry : 121100,
  Tank :121100,
  keys: function() {
    return Object.keys(this).filter(key => typeof this[key] !== 'function');
  }
}
const entityClassification = {
    Pending : 0 ,
    Unknown : 1 ,
    Assumed_Friend : 2,
    Friend : 3 ,
    Natural : 4 ,
    Subsect : 5 ,
    Hostile : 6 ,
  keys: function() {
    return Object.keys(this).filter(key => typeof this[key] !== 'function');
  }
}


const selectedEntityType = ref('Select Entity Type')
const selectedEntityClassification = ref('Select Classification type')
let natoSIDC = '300310000012110000000';

function setNatoClassificationSIDC(Num){
  natoSIDC = natoSIDC.slice(0, 3) + Num + natoSIDC.slice(3 + Num.toString().length);
}
function setNatoTypeSIDC(Num){
  natoSIDC = natoSIDC.slice(0, 10) + Num + natoSIDC.slice(10 + Num.toString().length);
}
const iconCanvas = ref(null);
function natoSymbologyGenerator() {
  const canvas = iconCanvas.value;
  const canvasContext = canvas.getContext('2d');
  canvas.width = 160;
  canvas.height = 160;
  const entityTypeSIDC = entityType[selectedEntityType.value]
  const entityClassificationSIDC = entityClassification[selectedEntityClassification.value]

  setNatoClassificationSIDC(entityClassificationSIDC)
  setNatoTypeSIDC(entityTypeSIDC)
  const natoIcon = new milsymbol.Symbol(natoSIDC);
  const svgString = natoIcon.asSVG();
  const canvasImage = new Image();

  canvasImage.onload = () => {
    canvasContext.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
  };

  canvasImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

let x = ref("")
</script>



<template>

  <TableData :table_Colum="table_Column"  :table_Data="table_Data"/>


  <button class="btn btn-block flex justify-center"   onclick="my_modal_1.showModal()"> Add Scenario</button>




  <Modal modalId="my_modal_1" modalTitle="Create Scenario" SubmitText="Next" Event="my_modal_2.showModal()" :Progress="1" >
    <InputText v-model="x" label="Scenario Name" placeHolder="Enter Scenario name"/>
  </Modal>



  <Modal  modalId="my_modal_2" modalTitle="Create Entity" SubmitText="Next" Event="my_modal_3.showModal()" :Progress="2">
    <InputText label="Entity Name" placeHolder="Enter Entity name"/>
    <DropDown @click="natoSymbologyGenerator" v-model="selectedEntityType" :Options="entityType.keys()" label="Entity Type" placeHolder="Pick One" />
    <DropDown @click="natoSymbologyGenerator" v-model="selectedEntityClassification"  :Options="entityClassification.keys()" label="Entity Classification" placeHolder="Chose One" />
    <div class="flex flex justify-center mt-5">
      <canvas ref="iconCanvas"/>
    </div>
    <p class="text-center mt-5"> Nato SIDC : {{natoSIDC}}</p>
  </Modal>

  <Modal modalId="my_modal_3" modalTitle="Create s" SubmitText="s" :Progress="3">
    <InputText label="s Name" placeHolder="Enter s name"/>
  </Modal>
</template>