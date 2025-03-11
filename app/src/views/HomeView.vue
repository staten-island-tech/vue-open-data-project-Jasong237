<script setup>
import TheWelcome from '../components/SchoolList.vue'
// https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&nm=Chloe
import { ref, onMounted } from 'vue'

let names = ref('')

async function getNames() {
  try {
    const res = await fetch(
      'https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&$limit=5',
    )
    console.log('response', res)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      names.value = data
      console.log(names.value)
    }
  } catch (error) {
    alert(error)
  }
}
onMounted(() => {
  getNames()
})
</script>

<template>
  <main>
    <h1>Hello</h1>
    <div class="container">
      <TheWelcome class="card" v-for="name in names" :key="name" :name="name" :nm="nm" />
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
