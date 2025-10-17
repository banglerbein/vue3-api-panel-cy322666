<template>
  <div>
    <h2>Stocks</h2>

    <FiltersPanel v-model="filters" @apply="onApply" />

    <LineChart :labels="chartLabels" :series="chartSeries" title="Stock Quantities" />

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

const { data, pagination, filters, fetchPage, setFilters } = useFetchPaginated('/api/stocks')

const formatDate = (d) => d.toISOString().slice(0, 10)
const today = new Date()
const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(today.getDate() - 7)
filters.value = { dateFrom: formatDate(sevenDaysAgo), dateTo: formatDate(today), limit: 100 }

const columns = [
  'nm_id',
  'supplier_article',
  'tech_size',
  'barcode',
  'quantity',
  'warehouse_name',
  'in_way_to_client',
  'in_way_from_client',
  'subject',
  'category',
  'brand',
  'price',
  'discount_percent',
  'is_supply',
]

fetchPage(1)

function onApply(f) {
  setFilters(f)
  fetchPage(1)
}
function changePage(p) {
  fetchPage(p)
}

const chartLabels = computed(() => data.value.map((r) => r.last_change_date?.slice(0, 10)))
const chartSeries = computed(() => data.value.map((r) => +r.quantity || 0))
</script>
