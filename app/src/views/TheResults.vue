<template>
  <div>
    <button @click="restartGame">Restart Game</button>
    <button @click="changeVisiblity"> Check Real Ranking </button>
    <div v-if="visible">
      <h1> Your ranking </h1>
      <BarChart :ranks="ranks" :counts="counts" />
  </div>
  <div v-if="!visible">
      <h1> Actual ranking </h1>
      <BarChart :ranks="sortedRanks" :counts="sortedCounts" />
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BarChart from '../components/ResultsChart.vue'
const visible = ref(true)
const router = useRouter()

const ranks = JSON.parse(sessionStorage.getItem('ranks')) || []
const counts = JSON.parse(sessionStorage.getItem('counts')) || []

console.log(ranks)
console.log(counts)

const sortedCounts = ref([])
const sortedRanks = ref([])

function sortBoth() {
  const sortedArray = ranks
    .map((rank, index) => ({
      rank,
      count: counts[index]
    }))
    .sort((a, b) => b.count - a.count) 
  
  sortedRanks.value = sortedArray.map(item => item.rank)
  sortedCounts.value = sortedArray.map(item => item.count)
  console.log(sortedRanks.value)
  console.log(sortedCounts.value)
}

sortBoth()
const restartGame = () => {
  sessionStorage.clear()
  router.push('/')
}

function changeVisiblity(){
  visible.value = !visible.value
}
</script>
