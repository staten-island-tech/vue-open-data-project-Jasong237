<template>
  <div>
    <RankStyle 
      v-for="(rank, index) in sets" 
      :key="rank" 
      :set="rank" 
      :id="index" 
      @updateSet="updateSet"
    />
    <h1>Random Name: {{ displayName }}</h1>
    <button @click="startRandomizer">Randomize Name</button>
    <div v-if="visible">
      <router-link :to="nameInfo"> Hello </router-link>
    </div>
    <button @click="clearGame()"> Hey </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import RankStyle from '@/components/RankStyle.vue'

const visible = ref(false)
const names = ref([])
const displayName = ref('')
const sets = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
let intervalId = null

async function getNames() {
  try {
    const res = await fetch(
      'https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&$limit=100',
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    names.value = data
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
    visible.value = true
    sessionStorage.setItem('displayName', displayName.value)
    console.log(displayName.value)
  }, 2000)

}

function updateSet(id) {

  displayName.value
  ? nextOptions(id)
  : alert('Remember to spin for a name before you click a rank!');

}

function nextOptions(id){
  console.log(id)
  console.log(displayName.value)
  console.log(sets.value[id])
 Number(sets.value[id]) === id + 1
    ? pushName(id)
    : alert('Dont put other names in!!')
}


function pushName(id){
  sets.value[id] = displayName.value 
  sessionStorage.setItem('ranks', JSON.stringify(sets.value))
  displayName.value = null
  visible.value = false
}
const nameInfo = computed(() => {
  if (names.value.length > 0) {
    const finalIndex = names.value.findIndex((item) => item.nm === displayName.value)
    return `/name/${names.value[finalIndex]?.nm}`
  }
  return '#'
})

onMounted(() => {
  getNames()
  displayName.value = sessionStorage.getItem('displayName')
  const storedRanks = sessionStorage.getItem('ranks')
  storedRanks ? sets.value = JSON.parse(storedRanks) : console.log("filler")
})

function clearGame(){
  sessionStorage.clear()
}
</script>
