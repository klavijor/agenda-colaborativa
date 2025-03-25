<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const nombre = ref('')
const router = useRouter()

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  const id = userData.user.id

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('nombre')
    .eq('id', id)
    .single()

  nombre.value = perfil?.nombre ?? 'Terapeuta'
})

async function logout() {
  await supabase.auth.signOut()
  router.push('/login')
}

function accion(tipo) {
  alert(`Acción seleccionada: ${tipo}`)
}
</script>

<template>
    <div class="inicio">
      <h1>¡Hola, {{ nombre }}! 👋</h1>
      <button @click="logout" class="logout">Cerrar sesión</button>
      <p>Bienvenid@ a tu agenda colaborativa</p>
  
      <section class="resumen">
        <h2>Resumen del día</h2>
        <ul>
          <li><strong>Próxima sesión:</strong> Juan Pérez - 3:00 PM</li>
          <li><strong>Sesiones hoy:</strong> 2</li>
          <li><strong>Tareas por revisar:</strong> 1</li>
        </ul>
      </section>
  
      <section class="acciones">
        <h2>Acciones rápidas</h2>
        <button @click="router.push('/registrar-sesion')">+ Nueva sesión</button>
        <button @click="accion('agenda')">Ver agenda</button>
        <button @click="accion('tareas')">Asignar tarea</button>
        <button @click="accion('historial')">Ver historial</button>
      </section>
    </div>
  </template>
  
  <style scoped>
  .inicio {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    font-family: sans-serif;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .resumen, .acciones {
    margin-top: 2rem;
  }
  .acciones button {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.75rem;
    font-size: 1rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .acciones button:hover {
    background-color: #369d6e;
  }
  .logout {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.logout:hover {
  background-color: #dc2626;
}
  </style>
  