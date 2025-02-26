<script setup>
import TheWelcome from '../components/TheWelcome.vue'
// https://data.cityofnewyork.us/resource/f9bf-2cp4.json
import { ref, onMounted } from 'vue'

const school = ref('')
async function getPokemon() {
  let res = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
  let data = await res.json()
  school.value = data.results
  console.log(school.value)
}
onMounted(() => {
  getPokemon()
})
</script>

<template>
  <main>
    <h1>Hello</h1>
    <div class="container">
      <TheWelcome class="card" v-for="school in schools" :key="school.name" :school="school" />
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
