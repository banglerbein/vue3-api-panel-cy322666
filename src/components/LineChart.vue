<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { Chart } from 'chart.js/auto'

export default {
  props: { labels: Array, series: Array, title: String },
  setup(props) {
    const canvas = ref(null)
    let chart = null

    function renderChart() {
      if (!canvas.value) return
      if (chart) chart.destroy()

      chart = new Chart(canvas.value, {
        type: 'line',
        data: {
          labels: props.labels,
          datasets: [
            {
              label: props.title,
              data: props.series,
              borderColor: '#007bff',
              fill: false,
              tension: 0.2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      })
    }

    onMounted(renderChart)
    watch(() => [props.labels, props.series], renderChart)
    return { canvas }
  },
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 300px; 
  overflow: hidden;
}

canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
