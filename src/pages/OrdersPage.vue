<template>
  <div>
    <h2>Orders</h2>

    <FiltersPanel
      :modelValue="filters"
      @apply="onApply"
      @update:modelValue="(f) => (filters = f)"
    />

    <LineChart :labels="chartLabels" :series="chartSeries" title="Orders Totals" />

    <DataTable :rows="data" :columns="columns" />
    <Pagination
      :page="pagination.page"
      :total="pagination.total"
      :limit="pagination.limit"
      @change="changePage"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useFetchPaginated } from '../composables/useFetchPaginated'
import DataTable from '../components/DataTable.vue'
import FiltersPanel from '../components/FiltersPanel.vue'
import Pagination from '../components/Pagination.vue'
import LineChart from '../components/LineChart.vue'

export default {
  components: { DataTable, FiltersPanel, Pagination, LineChart },
  setup() {
    const { data, pagination, filters, fetchPage, setFilters } = useFetchPaginated('/api/orders')


    const formatDate = (d) => d.toISOString().slice(0, 10)

    const today = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)

 
    filters.value = {
      dateFrom: formatDate(sevenDaysAgo),
      dateTo: formatDate(today),
      limit: 100,
    }

    const columns = [
      'barcode',
      'brand',
      'cancel_dt',
      'category',
      'date',
      'discount_percent',
      'g_number',
      'income_id',
      'is_cancel',
      'last_change_date',
      'nm_id',
      'oblast',
      'odid',
      'subject',
      'supplier_article',
      'tech_size',
      'total_price',
      'warehouse_name',
    ]

    // 🔹 Первый запрос при загрузке страницы
    fetchPage(1)

    function onApply(f) {
      setFilters(f)
      fetchPage(1)
    }

    function changePage(p) {
      fetchPage(p)
    }

    const chartLabels = computed(() => data.value.map((r) => r.created_at?.slice(0, 10)))
    const chartSeries = computed(() => data.value.map((r) => +r.total || 0))

    return {
      data,
      filters,
      pagination,
      columns,
      onApply,
      changePage,
      chartLabels,
      chartSeries,
    }
  },
}
</script>
