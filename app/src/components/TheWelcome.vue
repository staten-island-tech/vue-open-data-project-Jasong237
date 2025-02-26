<template>
  <div>
    <!--   <router-link :to="pkmnPath" class="card"> -->
    <div>
      <h2>{{ school.name }}</h2>
    </div>
    <!--     </router-link> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  school: Object,
  name: String,
})
const pkmnPath = computed(() => {
  return `/pokemon/${props.id}`
})
</script>

<style lang="scss" scoped></style>

https://data.cityofnewyork.us/resource/f9bf-2cp4.json
