<template>
  <div class="flex items-center justify-center h-60">
    <div
      class="card rounded shadow-lg w-40 h-40 flex flex-col items-center justify-between border-4 border-emerald-500 p-4"
    >
      <h1 class="text-3xl mb-4">{{ set }}</h1>
      <button
        class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        @click="updateSet"
      >
        Update
      </button>
    </div>
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
