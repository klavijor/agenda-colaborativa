import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import LoginView from '../views/LoginView.vue'
import InicioView from '../views/InicioView.vue'
import InicioCuidador from '../views/InicioCuidador.vue'
import RegistrarSesion from '../views/RegistrarSesionView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/inicio', name: 'Inicio', component: InicioView, meta: { requiresAuth: true } },
  { path: '/cuidador', name: 'Cuidador', component: InicioCuidador, meta: { requiresAuth: true } },
  { path: '/registrar-sesion', name: 'RegistrarSesion', component: RegistrarSesion, meta: { requiresAuth: true }},
  { path: '/admin', name: 'Admin', component: AdminView, meta: { requiresAuth: true }}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 Protege rutas que requieren autenticación
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user

  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }

  if (to.path === '/login' && user) {
    // Si ya está logueado y entra a login, redirige según rol
    const { data: perfil } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('id', user.id)
      .single()

    if (perfil?.rol === 'terapeuta') return next('/inicio')
    if (perfil?.rol === 'cuidador') return next('/cuidador')
  }

  return next()
})

export default router
