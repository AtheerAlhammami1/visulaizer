import { defineStore} from "pinia";

export let useMarkersStore = defineStore('markersStore',{
    state(){
        return{
            markers: [],
        }
    },
    actions:{
        insert(index, id, latitude, longitude){
        this.markers.push({
            index: index,
            id: id,
            position: {
            lat: latitude,
            lng: longitude
            }
        })
        }
    }
})