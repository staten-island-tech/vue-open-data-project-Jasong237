<template>
  <div>
    <div v-for="school in school" :key="school.dbn">
      <h1>{{ school.dbn }}</h1>
      <h1>{{ school.school_name }}</h1>
      <h1>{{ school.num_of_sat_test_takers }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  getSchools()
})
</script>

<style lang="scss" scoped></style>
