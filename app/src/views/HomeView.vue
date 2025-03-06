<script setup>
import TheWelcome from '../components/SchoolList.vue'
// https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=01M292
import { ref, onMounted } from 'vue'

let schools = ref('')

async function getSchools() {
  try {
    const res = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json?$limit=5')
    console.log('response', res)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      schools.value = data
      console.log(schools.value)
    }
  } catch (error) {
    alert(error)
  }
}
onMounted(() => {
  getSchools()
})
</script>

<template>
  <main>
    <h1>Hello</h1>
    <div class="container">
      <TheWelcome
        class="card"
        v-for="school in schools"
        :key="school"
        :school="school"
        :dbn="school.dbn"
        :sat_writing_avg_score="school.sat_writing_avg_score"
      />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
