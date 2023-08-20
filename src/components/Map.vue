<script setup>
import { computed, ref } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
import MapControlPanel from './MapControlPanel.vue'
import MapInformationModal from './MapInformationModal.vue'

const markersList = useMarkersStore() //to access waypoints array across pages
const showWaypointInformationModal = ref(false)

let lastShowedWayPointIndex = -1

function addWayPoint(e) {
  if (markersList.selectedEntityIndex != -1) {
    if (markersList.selectedEntityWaypoint.length < 10) {
      const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      markersList.addWaypoint(position)
    } else {
      alert('Already there are 10 waypoints')
    }
  } else {
    alert('Select entity')
  }
}
function removeWaypoint(index) {
  if (lastShowedWayPointIndex == index) {
    showWaypointInformationModal.value = false
    lastShowedWayPointIndex = -1
  } else if (lastShowedWayPointIndex > index) {
    lastShowedWayPointIndex = lastShowedWayPointIndex - 1
  }
  markersList.removeWaypoint(index)
}

function updateWaypoint(e, index) {
  const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
  markersList.updateWaypoint(index, position)
  updateInformationModalPosition(e.domEvent.x, e.domEvent.y)
}

const map = ref()
let mapProperties
const waypoint = ref()
const modalPosition = ref({ left: 0, top: 0 })
function toggleInformationModal(e, index) {
  if (index == lastShowedWayPointIndex) {
    showWaypointInformationModal.value = false
    lastShowedWayPointIndex = -1
    return
  }
  waypoint.value = markersList.selectedEntityWaypoint[index]
  lastShowedWayPointIndex = index
  showWaypointInformationModal.value = true

  const mapObject = map.value.$el
  mapProperties = mapObject.getBoundingClientRect()

  updateInformationModalPosition(e.domEvent.x, e.domEvent.y)
}
function updateInformationModalPosition(xPosition, yPosition) {
  if (mapProperties) {
    modalPosition.value.left =
      xPosition < mapProperties.width / 2
        ? xPosition + 20 + 'px'
        : xPosition - (mapProperties.width / 5 + 20) + 'px'

    modalPosition.value.top = yPosition - 60 + 'px'
  }
}

function waypointColor(index) {
  const path = 'src/assets/images/'
  const fileName =
    index == 0
      ? 'redLocationIcon.svg'
      : index == markersList.selectedEntityWaypoint.length - 1
      ? 'GreenLocationIcon.svg'
      : 'yellowLocationIcon.svg'
  return path + fileName
}

defineProps({
  center: Object
})

const numberOfLines = computed(() =>
  markersList.selectedEntityWaypoint.length != 0 ? markersList.selectedEntityWaypoint.length - 1 : 0
)

const mapOptions = {
  mapTypeControl: false
}
</script>
<template>
  <main class="border-2 border-base-content relative">
    <MapControlPanel />
    <MapInformationModal
      @hideModal="showWaypointInformationModal = false"
      :show="showWaypointInformationModal"
      :modalPosition="modalPosition"
      :waypoint="waypoint"
    />
    <GMapMap
      ref="map"
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      @click="addWayPoint($event)"
      @dragstart="showWaypointInformationModal = false"
      @bounds_changed="showWaypointInformationModal = false"
      :options="mapOptions"
    >
      <GMapMarker
        v-if="markersList.movingEntity.length != 0"
        :key="index"
        v-for="(entity, index) in markersList.movingEntity"
        :position="entity.position"
        :clickable="true"
        :draggable="true"
        :icon="
          markersList.entitySide == 'Friend'
            ? 'src/assets/images/FriendEntity.svg'
            : 'src/assets/images/HostileEntity.svg'
        "
      />

      <GMapMarker
        v-if="markersList.movingEntity.length == 0"
        :key="index"
        v-for="(waypoint, index) in markersList.selectedEntityWaypoint"
        :position="waypoint.position"
        :clickable="true"
        :draggable="true"
        :label="String(waypoint.order)"
        :icon="waypointColor(index)"
        @drag="updateWaypoint($event, index)"
        @rightclick="removeWaypoint(index)"
        @click="toggleInformationModal($event, index)"
      />
      <GMapPolyline
        v-if="markersList.movingEntity.length == 0"
        :key="index"
        v-for="(m, index) in numberOfLines"
        :path="[
          {
            lat: markersList.selectedEntityWaypoint[index]?.position.lat,
            lng: markersList.selectedEntityWaypoint[index]?.position.lng
          },
          {
            lat: markersList.selectedEntityWaypoint[index + 1]?.position.lat,
            lng: markersList.selectedEntityWaypoint[index + 1]?.position.lng
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
