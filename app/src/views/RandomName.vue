<template>
  <div class="pt-5 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-4xl p-4">
      <h1 class="text-6xl text-center">Random Birth Name Tier List</h1>
      <div class="flex flex-col items-center space-y-4">
        <div v-for="(rank, index) in sets" :key="rank" class="w-full">
          <RankStyle :set="rank" :id="index" @updateSet="updateSet" />
        </div>
      </div>

      <h1 class="mt-60 text-3xl">Random Name: {{ displayName }}</h1>

      <button v-if="!visible" @click="startRandomizer" class="text-green-600">
        Randomize Name
      </button>

      <div v-if="visible" class="mt-4">
        <router-link :to="nameInfo" class="text-green-600"> Check Stats </router-link>
      </div>
      <div>
        <router-link v-if="gameEnd" to="/results" class="mt-4 text-red-600"> End Game </router-link>
      </div>
    </div>
  </div>
</template>

<style></style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import RankStyle from '@/components/RankStyle.vue'

const status = ref(false)
const visible = ref(false)
const gameEnd = ref(false)
const names = ref([])
const displayName = ref('')
const sets = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
const nameChoices = ref([])
const counts = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
let intervalId = null
let entries = ref(0)

async function getNames() {
  try {
    const res = await fetch('https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013')
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    names.value = data
  } catch (error) {
    alert(error)
  }
}

function startRandomizer() {
  if (status.value === true) {alert('Dont click too quickly')}

  else {
  status.value = true
  sessionStorage.setItem('status', status.value)
  intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.value.length)
    displayName.value = names.value[randomIndex].nm
  }, 50)

  setTimeout(() => {
    clearInterval(intervalId)
    const finalIndex = Math.floor(Math.random() * names.value.length)
    displayName.value = names.value[finalIndex].nm
    sessionStorage.setItem('displayName', displayName.value)
    visible.value = true
    sessionStorage.setItem('visible', visible.value)
    addTotal()
    status.value = false
    sessionStorage.setItem('status', status.value)
   }, 2000)
  }
}
const current = ref([])
const amount = ref(0)
async function addTotal() {
  try {
    const res = await fetch(
      `https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&nm=${displayName.value}`,
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    current.value = data
    const uniqueEthnicities = data.filter(
      (item, index, self) => index === self.findIndex((t) => t.ethcty === item.ethcty),
    )
    countAll(uniqueEthnicities)
  } catch (error) {
    alert(error)
  }
}

function countAll(e) {
  for (let i = 0; i < e.length; i++) {
    amount.value = amount.value + Number(e[i].cnt)
  }
  sessionStorage.setItem('total', amount.value)
}

function updateSet(id) {
  visible.value && displayName.value
    ? nextOptions(id)
    : alert('Remember to spin for a name before you click a rank!')
}

function nextOptions(id) {
  Number(sets.value[id]) === id + 1 ? pushName(id) : alert('Dont put other names in!!')
}

function pushName(id) {
  let failsafe = ref(false)

  for (let i = 0; i < sets.value.length; i++) {
    if (sets.value[i] === displayName.value) {
      failsafe.value = true
    }
  }
  if (failsafe.value === true) {
    alert('Sorry we found a duplicate. We will remove it for you. Please try again')
  } else {
    sets.value[id] = displayName.value
    entries.value = entries.value + 1
    sessionStorage.setItem('entries', entries.value)
    checkProgress()
    nameChoices.value.push(displayName.value)
    sessionStorage.setItem('nameChoices', JSON.stringify(nameChoices.value))
    counts.value[id] = sessionStorage.getItem('total')
    sessionStorage.setItem('counts', JSON.stringify(counts.value))
  }
  sessionStorage.setItem('ranks', JSON.stringify(sets.value))
  displayName.value = ''
  amount.value = 0
  visible.value = false
  sessionStorage.setItem('total', amount.value)
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
  if (entries.value === 10) {
    alert('Game over!')
    gameEnd.value = true
    sessionStorage.setItem('gameEnd', gameEnd.value)
  }
}

onMounted(() => {
  getNames()
  displayName.value = sessionStorage.getItem('displayName')
  const storedRanks = sessionStorage.getItem('ranks')
  if (storedRanks) {
    sets.value = JSON.parse(storedRanks)
  }
  amount.value = sessionStorage.getItem('total')
  status.value = sessionStorage.getItem('status')
  visible.value = sessionStorage.getItem('visible')
  gameEnd.value = sessionStorage.getItem('gameEnd')
  entries.value = Number(sessionStorage.getItem('entries'))
  const theNames = sessionStorage.getItem('nameChoices')
  if (theNames) {
    nameChoices.value = JSON.parse(theNames)
  }

  const theCounts = sessionStorage.getItem('counts')
  if (theCounts) {
    counts.value = JSON.parse(theCounts)
  }
})
</script>
