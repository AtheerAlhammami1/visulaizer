<script setup>
import { ref, computed } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'

let markersList = useMarkersStore() //to access waypoints array across pages
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

function updateWaypoint(e, index) {
  const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
  markersList.updateWaypoint(index, position)
}

function removeWaypoint(index) {
  markersList.removeWaypoint(index)
  if (lastShowedWayPointIndex == index) {
    show.value = false
    lastShowedWayPointIndex = -1
  } else if (lastShowedWayPointIndex > index) {
    lastShowedWayPointIndex = lastShowedWayPointIndex - 1
    updateInformationModal(lastShowedWayPointIndex)
  }
}

function updateInformationModal(index) {
  const modal = document.querySelector('div#modal')
  const waypoint = markersList.markers[index]
  modal.innerHTML = `
  <h5 style="color:inherit;">ID: ${waypoint.id}</h5>
  <p style="color:inherit;">Lat: ${waypoint.position.lat}</p>
  <p style="color:inherit;">Lng: ${waypoint.position.lng}</p>
  `
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
  <h5 style="color:inherit;">ID: ${waypoint.id}</h5>
  <p style="color:inherit;">Lat: ${waypoint.position.lat}</p>
  <p style="color:inherit;">Lng: ${waypoint.position.lng}</p>
  `

  if (mapLocation.left + mapLocation.width - e.domEvent.x > mapLocation.width / 2) {
    modal.style.left = e.domEvent.x + 20 + 'px'
    modal.style.top = e.domEvent.y + 20 + 'px'
  } else {
    modal.style.left = e.domEvent.x - (mapLocation.width * 0.4 + 20) + 'px'
    modal.style.top = e.domEvent.y + 20 + 'px'
  }
}

function iconColor(index) {
  const path = 'src/assets/images/'
  const fileName =
    index == 0
      ? 'redLocationIcon.svg'
      : index == markersList.markers.length - 1
      ? 'GreenLocationIcon.svg'
      : 'yellowLocationIcon.svg'
  return path + fileName
}

defineProps({
  center: Object
})

const numberOfLines = computed(() =>
  markersList.markers.length == 0 ? 0 : markersList.markers.length - 1
)
</script>
<template>
  <main class="w-1/2 h-full border-2">
    <div
      v-show="show"
      id="modal"
      class="w-1/5 h-1/5 absolute z-10 p-5 border-2 border-b-slate-600 opacity-80 bg-base-100"
    ></div>
    <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      @click="addWayPoint($event)"
      @dragstart="show = false"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in markersList.markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :label="String(m.id)"
        :icon="iconColor(index)"
        @drag="updateWaypoint($event, index)"
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
