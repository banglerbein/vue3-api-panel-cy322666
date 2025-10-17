import { ref } from 'vue'
import { fetchEntity } from '../api/apiService'

export function useFetchPaginated(endpoint) {
  const data = ref([])
  const loading = ref(false)
  const pagination = ref({ page: 1, limit: 100
    , total: 0 })
  const filters = ref({})

  async function fetchPage(page = 1) {
    loading.value = true
    try {
      const params = { ...filters.value, page, limit: pagination.value.limit }
      const res = await fetchEntity(endpoint, params)
      data.value = res.data || []
      pagination.value = res.pagination || { page, limit: 100, total: data.value.length }
    } finally {
      loading.value = false
    }
  }

  function setFilters(f) {
    filters.value = f
  }

  return { data, loading, pagination, filters, fetchPage, setFilters }
}
