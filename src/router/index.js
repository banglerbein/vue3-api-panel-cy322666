import { createRouter, createWebHistory } from 'vue-router'

import OrdersPage from '../pages/OrdersPage.vue'
import SalesPage from '../pages/SalesPage.vue'
import IncomesPage from '../pages/IncomesPage.vue'
import StocksPage from '../pages/StockPage.vue'

const routes = [
  { path: '/', redirect: '/orders' },
  { path: '/orders', component: OrdersPage },
  { path: '/sales', component: SalesPage },
  { path: '/incomes', component: IncomesPage },
  { path: '/stocks', component: StocksPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
