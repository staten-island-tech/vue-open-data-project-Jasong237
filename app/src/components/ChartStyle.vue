<template>
  <div style="width: 400px; height: 400px;">
    <PolarArea :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PolarArea } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

export default defineComponent({
  name: 'PolarChart',
  components: {
    PolarArea,
  },
  setup() {
    const chartData = ref({
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Polar Area Chart',
          data: [11, 16, 7, 3, 14, 4],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.raw + ' units';
            },
          },
        },
      },
    });

    return {
      chartData,
      chartOptions,
    };
  },
});
</script>
