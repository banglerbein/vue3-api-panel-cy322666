<template>
  <div style="margin-top: 10px">
    <button @click="prev" :disabled="page <= 1">Prev</button>
    <span style="margin: 0 10px">Стр. {{ page }} / {{ totalPages }}</span>
    <button @click="next" :disabled="page >= totalPages">Next</button>
  </div>
</template>

<script>
export default {
  props: { page: Number, total: Number, limit: Number },
  emits: ['change'],
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit || 1)
    },
  },
  methods: {
    prev() {
      if (this.page > 1) this.$emit('change', this.page - 1)
    },
    next() {
      if (this.page < this.totalPages) this.$emit('change', this.page + 1)
    },
  },
}
</script>
