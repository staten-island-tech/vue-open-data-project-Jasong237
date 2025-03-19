<template>
  <div>
    <div class="card">
      <div>
        <h2>{{ set }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  set: Object,
})
</script>

<style lang="scss" scoped></style>
