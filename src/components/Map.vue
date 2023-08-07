<script setup>
import { ref, computed } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
let markersList = useMarkersStore() //to access waypoints array across pages
defineProps({
  center: Object
})

const numberOfLines = computed(
  () =>
    Math.floor(markersList.markers.length / 2) +
    Math.floor(Math.abs(markersList.markers.length - 1) / 2)
)
let show = ref(false)
let lastShowedWayPointIndex = -1

function addWayPoint(e) {
  if (markersList.markers.length < 10) {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    markersList.insert(lat, lng)
  } else {
    alert('already there are 10 waypoints')
  }
}

function updateWeypoint(e, index) {
  const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
  markersList.updateWaypoint(index, position)
}

function removeWaypoint(index) {
  if (lastShowedWayPointIndex == index) {
    show.value = false
    lastShowedWayPointIndex = -1
  }
  markersList.removeWaypoint(index)
}

function toggleInformationModal(e, index) {
  if (index == lastShowedWayPointIndex) {
    show.value = false
    lastShowedWayPointIndex = -1
    return
  }
  const waypoint = markersList.markers[index]
  lastShowedWayPointIndex = index
  show.value = true

  const modal = document.querySelector('div#modal')
  const map = document.querySelector('div.vue-map-container')
  const mapLocation = map.getBoundingClientRect()

  modal.innerHTML = `
  <h5 style="color:black;">ID: ${waypoint.id}</h5>
  <p style="color:black;">Lat: ${waypoint.position.lat}</p>
  <p style="color:black;">Lng: ${waypoint.position.lng}</p>
  `

  if (mapLocation.left + mapLocation.width - e.domEvent.x > mapLocation.width / 2) {
    modal.style.left = e.domEvent.x + 20 + 'px'
    modal.style.top = e.domEvent.y + 20 + 'px'
  } else {
    modal.style.left = e.domEvent.x - (mapLocation.width / 2.484 + 20) + 'px'
    modal.style.top = e.domEvent.y + 20 + 'px'
  }
}
const RED_LOCATION_ICON = 'src/assets/images/redLocationIcon.svg'
const YELLOW_LOCATION_ICON = 'src/assets/images/yellowLocationIcon.svg'
const GREEN_LOCATION_ICON = 'src/assets/images/GreenLocationIcon.svg'
function iconColor(index) {
  return index == 0
    ? RED_LOCATION_ICON
    : index == markersList.markers.length - 1
    ? GREEN_LOCATION_ICON
    : YELLOW_LOCATION_ICON
}
</script>
<template>
  <main class="w-1/2 h-full border-2">
    <div
      v-show="show"
      id="modal"
      class="w-1/5 h-1/5 bg-white absolute z-10 p-5 border-2 border-slate-900 opacity-80"
    ></div>
    <GMapMap :center="center" :zoom="7" map-type-id="terrain" @click="addWayPoint($event)">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markersList.markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :label="String(m.id)"
        :icon="iconColor(index)"
        @dragend="updateWeypoint($event, index)"
        @rightclick="removeWaypoint(index)"
        @click="toggleInformationModal($event, index)"
      />
      <GMapPolyline
        :key="index"
        v-for="(m, index) in numberOfLines"
        :path="[
          {
            lat: markersList.markers[index]?.position.lat,
            lng: markersList?.markers[index]?.position.lng
          },
          {
            lat: markersList.markers[index + 1]?.position.lat,
            lng: markersList.markers[index + 1]?.position.lng
          }
        ]"
      />
      <GMapPolyline />
    </GMapMap>
  </main>
</template>
<style scoped>
.vue-map-container {
  height: 100%;
}
</style>
