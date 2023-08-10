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
  updateModalInformationPosition(e.domEvent.x, e.domEvent.y)
  markersList.updateWaypoint(index, position)
}

function removeWaypoint(index) {
  if (lastShowedWayPointIndex == index) {
    show.value = false
    lastShowedWayPointIndex = -1
  } else if (lastShowedWayPointIndex > index) {
    lastShowedWayPointIndex = lastShowedWayPointIndex - 1
  }
  markersList.removeWaypoint(index)
}

const map = ref()
let mapProperties
const waypoint = ref()
const modalPosition = ref({ left: 0, top: 0 })
function toggleModalInformation(e, index) {
  if (index == lastShowedWayPointIndex) {
    show.value = false
    lastShowedWayPointIndex = -1
    return
  }
  waypoint.value = markersList.markers[index]
  lastShowedWayPointIndex = index
  show.value = true

  const mapObject = map.value.$el
  mapProperties = mapObject.getBoundingClientRect()

  updateModalInformationPosition(e.domEvent.x, e.domEvent.y)
}
function updateModalInformationPosition(xPosition, yPosition) {
  if (mapProperties) {
    modalPosition.value.left =
      xPosition < mapProperties.width / 2
        ? xPosition + 20 + 'px'
        : xPosition - (mapProperties.width / 5 + 20) + 'px'

    modalPosition.value.top = yPosition - 60 + 'px'
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

const mapOptions = {
  mapTypeControl: false
}
</script>
<template>
  <main class="border-2 relative">
    <div class="w-1/5 h-1/2 absolute z-10 bg-base-100">
      <div class="h-1/2 border-b-2 border-r overflow-y-auto">
        <div class="flex justify-between border-b p-2">
          Friend Entity
          <font-awesome-icon class="px-1 pt-1 text-xl cursor-pointer" :icon="['fas', 'plus']" />
        </div>
      </div>
      <div class="h-1/2 border-b border-r overflow-y-auto border-b-2">
        <div class="flex justify-between border-b p-2">
          Hostile Entity
          <font-awesome-icon class="px-1 pt-1 text-xl cursor-pointer" :icon="['fas', 'plus']" />
        </div>
      </div>
    </div>
    <div
      class="w-1/5 h-1/5 absolute z-10 p-5 border-2 opacity-80 bg-base-100"
      :style="{ left: modalPosition.left, top: modalPosition.top }"
      v-show="show"
      id="modal"
      @click="show = false"
    >
      <h5>ID: {{ waypoint?.id }}</h5>
      <p>Lat: {{ waypoint?.position.lat }}</p>
      <p>Lng: {{ waypoint?.position.lng }}</p>
    </div>
    <GMapMap
      ref="map"
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      @click="addWayPoint($event)"
      @dragstart="show = false"
      @bounds_changed="show = false"
      :options="mapOptions"
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
        @click="toggleModalInformation($event, index)"
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
