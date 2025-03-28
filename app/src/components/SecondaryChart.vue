<template>
  <div style="width: 800px; height: 800px">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
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
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  async mounted() {
    const route = useRoute()
    this.loaded = false

    try {
      const res = await fetch(
        `https://data.cityofnewyork.us/resource/25th-nujf.json?brth_yr=2013&nm=${route.params.nm}`,
      )
      if (res.status > 200) {
        throw new Error(res)
      } else {
        const data = await res.json()
        const uniqueEthnicities = data.filter(
          (item, index, self) => index === self.findIndex((t) => t.ethcty === item.ethcty),
        )

        const labels = uniqueEthnicities.map((item) => item.ethcty)
        const counts = uniqueEthnicities.map((item) => parseInt(item.rnk, 10))
        const colors = getRandomColor()

        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: `Rank`,
              backgroundColor: colors,
              data: counts,
            },
          ],
        }

        this.loaded = true
      }
    } catch (error) {
      alert(error)
    }
  },
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
</script>
