<template>
  <div>
    <div v-for="school in school" :key="school.dbn">
      <h1>{{ school.dbn }}</h1>
      <h1>{{ school.school_name }}</h1>
      <h1>{{ school.num_of_sat_test_takers }}</h1>
    </div>
    <BarChart />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BarChart from '../components/ChartStyle.vue'

const props = defineProps({
  school: Object,
})

const route = useRoute()
const school = ref('')

async function getSchools() {
  try {
    const res = await fetch(
      `https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${route.params.dbn}`,
    )
    console.log('response', res)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      school.value = data
      console.log(school.value)
      changeValues()
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  getSchools()
})

let readScore = ref(`${school.value[0]}`)
let mathScore = ref(0)
let writeScore = ref(0)

function changeValues() {
  console.log(school.value)
  console.log(school.value[0].sat_writing_avg_score)
  /*   readScore.value = school.value[0].sat_critical_reading_avg_score
  mathScore.value = school.value[0].sat_math_avg_score
  writeScore.value = school.value[0].sat_writing_avg_score */
}
</script>

<style lang="scss" scoped></style>
