<script setup>
import {ref} from "vue"
import { useMarkersStore } from '../stores/useMarkers'
let markersList = useMarkersStore(); //to access waypoints array across pages
defineProps({
  center: Object
})

function addWayPoint(e){
  if(markersList.markers.length < 10){
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();
  markersList.insert(lat, lng)
}else{
  alert("already there are 10 waypoints")
}
}

function updateWeypoint(e, index){
  const position = {lat: e.latLng.lat(), lng: e.latLng.lng()}
  markersList.updateWaypoint(index, position)
}

function removeWaypoint(index){
markersList.removeWaypoint(index)
}
let show = ref(false);
function showModal(e, index){
  const waypoint = markersList.markers[index];

  const modal = document.querySelector("div#modal");
  modal.style.left = e.domEvent.x + 20 + "px"
  modal.style.top = e.domEvent.y + 20 + "px"
 

show.value = ! show.value
}
</script>
<template>
  
<main class="w-1/2 h-full border-2">
showModal
  <div v-show="show" id="modal" class="w-1/5 h-1/5 bg-white absolute z-10"></div>
      <GMapMap :center="center" :zoom="7" map-type-id="terrain" @click="addWayPoint($event)">
          <GMapMarker
            :key="index"
            v-for="(m, index) in markersList.markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @dragend="updateWeypoint($event, index)"
            @rightclick="removeWaypoint(index)"
            @click="showModal($event, index)"
            
          />
      </GMapMap>

</main>
</template>
<style scoped>
.vue-map-container{
  height: 100%;
}
</style>