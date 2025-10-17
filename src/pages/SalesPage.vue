<template>
  <div>
    <h2>Sales</h2>

    <FiltersPanel v-model="filters" @apply="onApply" />

    <LineChart :labels="chartLabels" :series="chartSeries" title="Sales Totals" />

    <DataTable :rows="data" :columns="columns" />

    <Pagination
      :page="pagination.page"
      :total="pagination.total"
      :limit="pagination.limit"
      @change="changePage"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFetchPaginated } from '../composables/useFetchPaginated'
import DataTable from '../components/DataTable.vue'
import FiltersPanel from '../components/FiltersPanel.vue'
import Pagination from '../components/Pagination.vue'
import LineChart from '../components/LineChart.vue'

const { data, pagination, filters, fetchPage, setFilters } = useFetchPaginated('/api/sales')

const formatDate = (d) => d.toISOString().slice(0, 10)
const today = new Date()
const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(today.getDate() - 7)
filters.value = { dateFrom: formatDate(sevenDaysAgo), dateTo: formatDate(today), limit: 100 }

const columns = [
  'sale_id',
  'date',
  'supplier_article',
  'tech_size',
  'barcode',
  'quantity',
  'total_price',
  'discount_percent',
  'is_cancel',
  'brand',
  'subject',
  'warehouse_name',
  'region_name',
  'income_id',
  'nm_id',
]

fetchPage(1)

function onApply(f) {
  setFilters(f)
  fetchPage(1)
}
function changePage(p) {
  fetchPage(p)
}

const chartLabels = computed(() => data.value.map((r) => r.date?.slice(0, 10)))
const chartSeries = computed(() => data.value.map((r) => +r.total_price || 0))
</script>
