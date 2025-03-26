import { createRouter, createWebHistory } from 'vue-router'
import HolaMundoView from '../views/HolaMundoView.vue'

const routes = [
  { path: '/', name: 'Home', component: HolaMundoView },
  // Redirección de cualquier ruta desconocida a la raíz
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
