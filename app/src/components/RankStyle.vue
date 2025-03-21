<template>
  <div>
    <h1>{{ set }}</h1>
    <button @click="updateSet">Update</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  set: String,
  id: Number,
})

const emit = defineEmits(['updateSet'])

function updateSet() {
  emit('updateSet', props.id)
}
</script>
