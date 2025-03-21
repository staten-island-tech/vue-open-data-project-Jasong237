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
      nameChoices: Array,
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
        const nameCounts = this.nameChoices.reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1
          return acc
        }, {})
  
        const labels = Object.keys(nameCounts)
        const counts = Object.values(nameCounts)
  
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Name Counts',
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              data: counts,
            },
          ],
        }
  
        this.loaded = true
      },
    },
  }
  </script>
  