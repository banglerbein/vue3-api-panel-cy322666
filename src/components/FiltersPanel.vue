<template>
  <div style="margin-bottom: 15px">
    <label>
      От:
      <input type="date" v-model="local.dateFrom" />
    </label>
    <label style="margin-left: 10px">
      До:
      <input type="date" v-model="local.dateTo" />
    </label>
    <label style="margin-left: 10px">
      Limit:
      <input type="number" v-model.number="local.limit" min="1" />
    </label>
    <button @click="apply" style="margin-left: 10px">Применить</button>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  props: { modelValue: Object },
  emits: ['update:modelValue', 'apply'],
  setup(props, { emit }) {
    const local = reactive({
      dateFrom: props.modelValue?.dateFrom || '',
      dateTo: props.modelValue?.dateTo || '',
      limit: props.modelValue?.limit || 100,
    })

    function apply() {
      emit('update:modelValue', { ...local })
      emit('apply', { ...local })
    }

    return { local, apply }
  },
}
</script>
