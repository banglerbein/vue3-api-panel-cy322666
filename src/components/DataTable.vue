<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col">{{ col }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    rows: Array,
    columns: Array,
  },
}
</script>
