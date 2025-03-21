<template>
    <div>
      <BarChart :nameChoices="nameChoices" />
    </div>
  </template>
  
  <script>
  import BarChart from '../components/ResultsChart.vue'
  
  export default {
    components: { BarChart },
    data() {
      return {
        nameChoices: JSON.parse(sessionStorage.getItem('nameChoices')) || [],
      }
    },
  }
  </script>
  