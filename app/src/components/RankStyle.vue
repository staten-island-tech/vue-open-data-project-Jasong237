<template>
  <div>
    <div class="card">
      <div>
        <h2>{{ set }}</h2>
        <h2>{{ id }}</h2>
        <button @click="pushName()">Hello</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import displayName from '@/views/RandomName.vue'
import sets from '@/views/RandomName.vue'
const props = defineProps({
  set: String,
  id: Number,
})

function pushName() {
  console.log(sets.value[props.id])
  console.log(sessionStorage.getItem(displayName))
  console.log(displayName.value)
  sets[props.id] = sessionStorage.getItem(displayName)
  console.log(sets[props.id].value)
}
</script>

<style lang="scss" scoped></style>
