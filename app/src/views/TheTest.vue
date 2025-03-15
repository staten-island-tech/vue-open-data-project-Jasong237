<template>
    <div>
      <h1>Random Name: {{ displayName }}</h1>
      <button @click="startRandomizer">Randomize Name</button>
      <router-link :to="nameInfo">
        Hello
      </router-link>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  
  export default {
    name: 'RandomName',
    setup() {
      const names = ref([])
      const displayName = ref('')  
      let intervalId = null
      

      async function getNames() {
        try {
          const res = await fetch(
            'https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&$limit=100',
          )
          console.log('response', res)
          if (res.status > 200) {
            throw new Error(res)
          } else {
            const data = await res.json()
            names.value = data
            console.log(names.value)
          }
        } catch (error) {
          alert(error)
        }
      }
  

      function startRandomizer() {
        if (names.value.length === 0) return
  
        intervalId = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * names.value.length)
          displayName.value = names.value[randomIndex].nm
        }, 50)
  
        setTimeout(() => {
          clearInterval(intervalId)
          const finalIndex = Math.floor(Math.random() * names.value.length)
          displayName.value = names.value[finalIndex].nm
        }, 2000) 
      }
  

      const nameInfo = computed(() => {
        if (names.value.length > 0) {
          const finalIndex = names.value.findIndex(item => item.nm === displayName.value)
          return `/name/${names.value[finalIndex].nm}`
        }
        return '#'
      })
  

      onMounted(() => {
        getNames()
      })
  
      return {
        displayName,
        startRandomizer,
        nameInfo,
      }
    },
  }
  </script>
  
  