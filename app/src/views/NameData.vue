<template>
  <div class="pt-5 flex items-center justify-center min-h-screen">
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-5xl mt-50">Data for {{ route.params.nm }}</h1>
    <div class="p-5">
      <router-link
        class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        :to="goBack"
      >
        Back
      </router-link>
    </div>
    <button
      class="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-800 rounded mb-4"
      @click="toggleVisibility"
    >
      {{ visible ? 'Additional Info' : 'Main Info' }}
    </button>
    <PolarArea v-if="visible" />
    <div v-if="invisible" class="mt-4">
      <h2>Total Amt of {{ route.params.nm }}s: {{ count }}</h2>
      <h5>** Note that the smaller the bar, the higher rank it is</h5>
      <BarChart />
    </div>
  </div>
</div>
</template>

<script setup>
import PolarArea from '../components/ChartStyle.vue'
import BarChart from '../components/SecondaryChart.vue'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

let ranks = ref([])
let count = ref(0)
const route = useRoute()
const visible = ref(true)
const invisible = ref(false)
const goBack = computed(() => {
  return `/`
})

const toggleVisibility = () => {
  visible.value = !visible.value
  invisible.value = !invisible.value
}

async function getStats() {
  try {
    const res = await fetch(
      `https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&nm=${route.params.nm}`,
    )
    console.log('response', res)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
      const uniqueEthnicities = data.filter(
        (item, index, self) => index === self.findIndex((t) => t.ethcty === item.ethcty),
      )
      countAll(uniqueEthnicities)
    }
  } catch (error) {
    alert(error)
  }
}
onMounted(() => {
  getStats()
})

function countAll(e) {
  for (let i = 0; i < e.length; i++) {
    count.value = count.value + Number(e[i].cnt)
  }

}

</script>

<style></style>
