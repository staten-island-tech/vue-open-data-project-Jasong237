<template>
  <div>
    <h1>Data for {{ route.params.nm }}</h1>
    <router-link :to="goBack">
      <h5> Back </h5>
    </router-link>
    <button @click="toggleVisibility">{{ visible ? 'Hide' : 'Show' }} Graph</button>
    

    <PolarArea v-if="visible" />
  </div>
</template>

<script setup>
import PolarArea from '../components/ChartStyle.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const visible = ref(true) 
const goBack = computed(() => {
  return `/`
})


const toggleVisibility = () => {
  visible.value = !visible.value
}
</script>


<style>
button {
background-color: green;
}
 </style>