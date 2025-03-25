<template>
  
  <div class="flex flex-col items-center justify-center text-center space-y-6">
    <div class="rounded shadow-lg w-40 h-40 items-center justify-around border-4 border-emerald-500 m-4 p-2">
      <h1 class="text-xl font-semibold mb-4">{{ set }}</h1> 
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
