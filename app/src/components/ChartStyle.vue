<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: Object,
})

const chartCanvas = ref(null)

const renderChart = () => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'polarArea',
      data: props.data,
      options: {
        responsive: true,
      },
    })
  }
}

onMounted(() => {
  renderChart()
})
</script>

<style lang="scss" scoped></style>
