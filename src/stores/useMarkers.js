import { defineStore } from 'pinia'

export let useMarkersStore = defineStore('markersStore', {
  state() {
    return {
      scenarioId: -1,
      entityNumber: 1,
      id: 1,
      friendEntities: [],
      hostileEntities: [],
      selectedEntityIndex: -1,
      selectedEntityWaypoint: [],
      entitySide: '',
      movingEntity: []
    }
  },
  actions: {
    selectEntity(entityIndex, side) {
      if (side == 'Friend') {
        if (this.selectedEntityIndex == entityIndex && this.entitySide == 'Friend') {
          this.selectedEntityIndex = -1
          this.selectedEntityWaypoint = []
        } else {
          this.selectedEntityIndex = entityIndex
          this.selectedEntityWaypoint = this.friendEntities[entityIndex].waypoint
        }
      } else if (side == 'Hostile') {
        if (this.selectedEntityIndex == entityIndex && this.entitySide == 'Hostile') {
          this.selectedEntityIndex = -1
          this.selectedEntityWaypoint = []
        } else {
          this.selectedEntityIndex = entityIndex
          this.selectedEntityWaypoint = this.hostileEntities[entityIndex].waypoint
        }
      }
      this.entitySide = side
    },
    addEntity(name, parentId, SIDC, scenarioId, entityMode, startTime, detectionRange) {
      const entitySide = SIDC.slice(3, 4)
      if (entitySide == 3) {
        this.friendEntities.push({
          id: this.entityNumber,
          name: name,
          parentId: parentId,
          SIDC: SIDC,
          scenarioId: scenarioId,
          mode: entityMode,
          startTime: startTime,
          detectionRange: detectionRange,
          waypoint: []
        })
      } else if (entitySide == 6) {
        this.hostileEntities.push({
          id: this.entityNumber,
          name: name,
          parentId: parentId,
          SIDC: SIDC,
          scenarioId: scenarioId,
          mode: entityMode,
          startTime: startTime,
          detectionRange: detectionRange,
          waypoint: []
        })
      }
      this.entityNumber = this.entityNumber + 1
    },
    removeEntity(index, panelName) {
      if (panelName == 'Friend') {
        this.friendEntities.splice(index, 1)
      } else if (panelName == 'Hostile') {
        this.hostileEntities.splice(index, 1)
      }
      this.selectedEntityIndex = -1
      this.selectedEntityWaypoint = []
    },
    addWaypoint(position) {
      if (this.movingEntity.length == 0) {
        this.selectedEntityWaypoint.push({
          id: this.id,
          order: this.selectedEntityWaypoint.length + 1,
          position: position
        })
        this.id = this.id + 1
      }
    },
    removeWaypoint(index) {
      this.selectedEntityWaypoint.splice(index, 1)
      for (let i = index; i < this.selectedEntityWaypoint.length; i++) {
        this.selectedEntityWaypoint[i].order = i + 1
      }
    },
    updateWaypoint(index, position) {
      this.selectedEntityWaypoint[index].position = position
    }
  }
})
