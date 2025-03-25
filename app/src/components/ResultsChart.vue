<template>
  <div style="width: 800px; height: 800px">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    ranks: Array,
    counts: Array,
  },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  mounted() {
    this.createChartData()
  },
  methods: {
    createChartData() {
      if (!this.ranks || !this.counts || this.ranks.length !== this.counts.length) {
        console.error('Invalid data: ranks and counts must have the same length')
        return
      }

      this.chartData = {
        labels: this.ranks,
        datasets: [
          {
            label: 'Total Count',
            backgroundColor: getRandomColor(),
            data: this.counts,
          },
        ],
      }

      this.loaded = true
    },
  },
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
</script>
