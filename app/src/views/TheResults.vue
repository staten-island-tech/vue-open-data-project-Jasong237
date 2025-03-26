<template>
  <div class="flex flex-col items-center justify-center h-full space-y-6 pt-5">
    <h1 class="text-5xl text-center"> Final Results </h1>
    <div class="p-5">
      <button
        class="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-800 rounded"
        @click="restartGame"
      >
        Restart Game
      </button>
    </div>
    <div class="mb-5">
      <button
        class="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-800 rounded mt-10"
        @click="changeVisiblity"
      >
        Check Real Ranking
      </button>
    </div>
    <div v-if="visible" class="text-center mt-4 p-4">
      <h1 class="text-3xl">Your ranking</h1>
      <h1 class="text-xl">1st Place is on the left, 10th place is on the right</h1>
      <BarChart :ranks="ranks" :counts="counts" />
    </div>
    
    <div v-if="!visible" class="text-center mt-4 p-4">
      <h1 class="text-3xl">Actual ranking</h1>
      <h1 class="text-xl">1st Place is on the left, 10th place is on the right</h1>
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



const sortedCounts = ref([])
const sortedRanks = ref([])

function sortBoth() {
  const sortedArray = ranks
    .map((rank, index) => ({
      rank,
      count: counts[index],
    }))
    .sort((a, b) => b.count - a.count)

  sortedRanks.value = sortedArray.map((item) => item.rank)
  sortedCounts.value = sortedArray.map((item) => item.count)

}

sortBoth()
const restartGame = () => {
  sessionStorage.clear()
  router.push('/')
}

function changeVisiblity() {
  visible.value = !visible.value
}
</script>
