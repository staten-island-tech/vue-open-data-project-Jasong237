<template>
  <div>
    <RankStyle v-for="rank in sets" :key="rank" :set="rank" />
    <h1>Random Name: {{ displayName }}</h1>
    <button @click="startRandomizer">Randomize Name</button>
    <div v-if="visible">
      <router-link :to="nameInfo"> Hello </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import RankStyle from '@/components/RankStyle.vue'

const visible = ref(false)
const names = ref([])
const displayName = ref('')
const sets = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
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
  }, 2000)
}

const nameInfo = computed(() => {
  if (names.value.length > 0) {
    const finalIndex = names.value.findIndex((item) => item.nm === displayName.value)
    return `/name/${names.value[finalIndex]?.nm || ''}`
  }
  return '#'
})

onMounted(() => {
  getNames()
})
</script>
