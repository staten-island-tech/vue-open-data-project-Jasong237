<template>
  <div>
    <div class="card">
      <div>
        <h2>{{ name.nm }}</h2>
        <router-link :to="nameInfo">
          <h5>Click for More Information</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: Object,
  nm: String,
})
const nameInfo = computed(() => {
  return `/name/${props.name.nm}`
})
</script>

<style lang="scss" scoped></style>
