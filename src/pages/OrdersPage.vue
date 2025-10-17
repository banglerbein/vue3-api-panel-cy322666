<template>
  <div class="p-4 space-y-4">
    <h2 class="text-2xl font-semibold">Orders</h2>

    <!-- Панель фильтров -->
    <FiltersPanel
      v-model="filters"
      @apply="onApply"
    />

    <!-- График -->
    <LineChart
      :labels="chartLabels"
      :series="chartSeries"
      title="Orders Total Price"
    />

    <!-- Таблица -->
    <DataTable :rows="data" :columns="columns" />

    <!-- Пагинация -->
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

// 📦 Composable для API-запросов
const { data, pagination, filters, fetchPage, setFilters } = useFetchPaginated('/api/orders')

// 🔹 Форматирование дат (Y-m-d)
const formatDate = (d) => d.toISOString().slice(0, 10)

// 🔹 Сегодня и 7 дней назад
const today = new Date()
const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(today.getDate() - 7)

// 🔹 Значения фильтров по умолчанию
filters.value = {
  dateFrom: formatDate(sevenDaysAgo),
  dateTo: formatDate(today),
  limit: 100,
}

// 🔹 Столбцы таблицы
const columns = [
  'odid',
  'date',
  'supplier_article',
  'tech_size',
  'barcode',
  'total_price',
  'discount_percent',
  'warehouse_name',
  'region_name',
  'brand',
  'subject',
  'is_cancel',
  'cancel_dt',
  'last_change_date',
]

// 🔹 Загружаем первую страницу при инициализации
fetchPage(1)

function onApply(f) {
  setFilters(f)
  fetchPage(1)
}

function changePage(p) {
  fetchPage(p)
}

// 🔹 Подготовка данных для графика
const chartLabels = computed(() =>
  data.value.map((r) => r.date?.slice(0, 10))
)
const chartSeries = computed(() =>
  data.value.map((r) => +r.total_price || 0)
)
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
</style>
