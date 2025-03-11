<template>
  <div>
    <h1>Data</h1>
    <div v-for="name in name" :key="name">
      <h1>{{ name.nm }}</h1>
    </div>
    <Bar />
  </div>
</template>

<script setup>
import Bar from '../components/ChartStyle.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  name: Object,
  nm: String,
})

const route = useRoute()
const name = ref('')

async function getName() {
  try {
    const res = await fetch(
      `https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&nm=${route.params.nm}`,
    )
    console.log('response', res)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      name.value = data
      console.log(name.value)
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  getName()
})
</script>

<style lang="scss" scoped></style>
