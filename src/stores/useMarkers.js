import { defineStore } from 'pinia'

export let useMarkersStore = defineStore('markersStore', {
  state() {
    return {
      entityNumber: 1,
      id: 1,
      friendEntities: [],
      hostileEntities: [],
      selectedEntityIndex: -1,
      selectedEntityWaypoint: [],
      entitySide: ''
      /*    0                      1
      {                         {
        id:1,                    id:2,    
        name:"Entity1",          name:"Entity2",
        parentId:0,              parentId:1,
        SIDC:0,                  SIDC:0,
        scenarioId:1,            scenarioId:1,
        waypoint:[               waypoint:[
          {                      {
          id:1,                  id:3,
          order:1,               order:1,
          position:{             position:{
            lat:10,              lat:10,
            lng:10               lng:10,
          }                     }
        },                     ]
         {                    }
          id:2,
          order:2,
          position:{
            lat:10,
            lng:10
          }
        }
        ]
      }
      */
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
    addEntity(name, parentId, SIDC, scenarioId) {
      if (SIDC == 0) {
        this.friendEntities.push({
          id: this.entityNumber,
          name: name + this.entityNumber,
          parentId: parentId,
          SIDC: SIDC,
          scenarioId: scenarioId,
          waypoint: []
        })
      } else if (SIDC == 1) {
        this.hostileEntities.push({
          id: this.entityNumber,
          name: name + this.entityNumber,
          parentId: parentId,
          SIDC: SIDC,
          scenarioId: scenarioId,
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
      this.selectedEntityWaypoint.push({
        id: this.id,
        order: this.selectedEntityWaypoint.length + 1,
        position: position
      })
      this.id = this.id + 1
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
