<template>
  <div style="width: 400px; height: 400px">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  async mounted() {
    this.loaded = false

    try {
      const res = await fetch(
        'https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&nm=Chloe',
      )
      console.log('response', res)
      if (res.status > 200) {
        throw new Error(res)
      } else {
        const data = await res.json()
        console.log(data)
        this.chartdata = data
        console.log(this.chartData)

        this.loaded = true
      }
    } catch (error) {
      alert(error)
    }
  },
}
</script>
