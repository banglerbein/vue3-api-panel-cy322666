<template>
  <div>
    <header>
      <nav>
        <router-link to="/orders">Orders</router-link>
        <router-link to="/sales">Sales</router-link>
        <router-link to="/incomes">Incomes</router-link>
        <router-link to="/stocks">Stocks</router-link>
      </nav>
    </header>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
