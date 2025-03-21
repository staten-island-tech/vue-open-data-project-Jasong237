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
    <button @click="clearGame()">Hey</button>
    <router-link v-if="gameEnd" to="/results"> End Game</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import RankStyle from '@/components/RankStyle.vue'

const visible = ref(false)
const gameEnd = ref(false)
const names = ref([])
const displayName = ref('')
const sets = ref(['1', '2', '3', '4', '5'])
const nameChoices = ref([])
const counts = ref([])
let intervalId = null
let entries = ref(0)

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
    sessionStorage.setItem('displayName', displayName.value)
    console.log(displayName.value)
    visible.value = true
    sessionStorage.setItem('visible', visible.value)
  }, 2000)
}

function updateSet(id) {
  visible.value
  ? displayName.value
    ? nextOptions(id)
    : alert('Remember to spin for a name before you click a rank!')
  : console.log('filler1')
}

function nextOptions(id) {
  console.log(id)
  console.log(displayName.value)
  console.log(sets.value[id])
  Number(sets.value[id]) === id + 1 ? pushName(id) : alert('Dont put other names in!!')
}

function pushName(id) {
  let failsafe = ref(false)

  for (let i = 0; i < sets.value.length; i++) {
    if (sets.value[i] === displayName.value) {
      failsafe.value = true
    } else {
      console.log('Hello')
    }
  }
  if (failsafe.value === true) {
    alert('Sorry we found a duplicate. We will remove it for you. Please try again')
  } else {
    sets.value[id] = displayName.value
    entries.value = entries.value + 1
    console.log("The entries", entries.value)
    sessionStorage.setItem('entries', entries.value)
    checkProgress()
    nameChoices.value.push(displayName.value)
    sessionStorage.setItem('nameChoices', JSON.stringify(nameChoices.value))
  }
  sessionStorage.setItem('ranks', JSON.stringify(sets.value))
  displayName.value = ""
  visible.value = false
  sessionStorage.setItem('displayName', displayName.value)
  sessionStorage.setItem('visible', visible.value)
}
const nameInfo = computed(() => {
  if (names.value.length > 0) {
    const finalIndex = names.value.findIndex((item) => item.nm === displayName.value)
    return `/name/${names.value[finalIndex]?.nm}`
  }
  return '#'
})

function checkProgress() {
  if (entries.value === 1) {
    alert('Game over!')
    gameEnd.value = true
    sessionStorage.setItem('gameEnd', gameEnd.value)
  }

}

onMounted(() => {
  getNames()
  displayName.value = sessionStorage.getItem('displayName') 
  const storedRanks = sessionStorage.getItem('ranks')
  storedRanks ? (sets.value = JSON.parse(storedRanks)) : console.log('filler')
  visible.value = sessionStorage.getItem('visible')
  gameEnd.value = sessionStorage.getItem('gameEnd')
  entries.value = Number(sessionStorage.getItem('entries'))
  const theNames = sessionStorage.getItem('nameChoices')
  theNames ? (nameChoices.value = JSON.parse(theNames)) : console.log('filler')
  console.log(nameChoices.value, "Names")
})

function clearGame() {
  sessionStorage.clear()
}

</script>
