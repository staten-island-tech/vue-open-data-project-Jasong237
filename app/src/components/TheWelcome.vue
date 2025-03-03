<template>
  <div>
    <router-link :to="pkmnPath" class="card">
      <div>
        <h2>{{ school.dbn }}</h2>
        <h2>{{ school.school_name }}</h2>
        <h5>Click for More Information</h5>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  school: Object,
})
const pkmnPath = computed(() => {
  return `/pokemon/${props.id}`
})
</script>

<style lang="scss" scoped></style>
