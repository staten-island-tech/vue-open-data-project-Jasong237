<template>
  <div>
    <h1>Data for {{ route.params.nm }}</h1>
    <div>
    <router-link :to="goBack">
    Back
    </router-link>
  </div>
    <button @click="toggleVisibility">{{ visible ? 'Additional Info' : 'Main Info' }} </button>

    <PolarArea v-if="visible" />
    <div v-if="invisible">
      <h2> Total Amt of {{ route.params.nm }}s: {{ count }} </h2>      
      <h5> ** Note that the smaller the bar, the higher rank it is</h5>
      <BarChart />

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
        console.log(uniqueEthnicities)
      countAll(uniqueEthnicities)
      checkRanks(uniqueEthnicities)
    }

  } catch (error) {
    alert(error)
  }
}
onMounted(() => {
  getStats()

})

function countAll(e){
  for (let i = 0; i < e.length; i++){
           count.value = count.value + Number(e[i].cnt)
        } 
        console.log(count.value)
}

function checkRanks(e){
  for (let i = 0; i < e.length; i++){
  console.log(e[i])
  }
  console.log(ranks.value)
}

</script>

<style>
button {
  background-color: green;
}
</style>
