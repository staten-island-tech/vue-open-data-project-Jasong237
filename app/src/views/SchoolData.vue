<template>
  <div>
    <div v-for="school in school" :key="school.dbn">
      <h1>{{ school.dbn }}</h1>
      <h1>{{ school.school_name }}</h1>
      <h1>{{ school.num_of_sat_test_takers }}</h1>
    </div>
    <ChartStyle :data="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ChartStyle from '../components/ChartStyle.vue'

let readScore = ref(23)
let mathScore = ref(0)
let writeScore = ref(0)

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

function changeValues() {
  readScore.value = school.value[0].sat_critical_reading_avg_score
  mathScore.value = school.value[0].sat_math_avg_score
  writeScore.value = school.value[0].sat_writing_avg_score
  console.log(readScore.value)
}

const chartData = {
  labels: ['Reading Score', 'Math Score', 'Writing Score'],
  datasets: [
    {
      label: 'Average Points',
      data: [`${route.params.sat_writing_avg_score}`, 2, 20],
      backgroundColor: ['red', 'blue', 'green'],
    },
  ],
}
</script>

<style lang="scss" scoped></style>
