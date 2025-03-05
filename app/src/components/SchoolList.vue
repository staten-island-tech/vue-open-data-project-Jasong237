<template>
  <div>
    <div class="card">
      <div>
        <h2>{{ school.dbn }}</h2>
        <h2>{{ school.school_name }}</h2>
        <router-link :to="schoolInfo">
          <h5>Click for More Information</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  school: Object,
  dbn: String,
  sat_writing_avg_score: Number,
})
const schoolInfo = computed(() => {
  return `/school/${props.dbn}`
})
</script>

<style lang="scss" scoped></style>
