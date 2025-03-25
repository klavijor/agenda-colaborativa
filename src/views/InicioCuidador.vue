<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const comentario = ref('')
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

  nombre.value = perfil?.nombre ?? 'Cuidador'
})

function enviarComentario() {
  if (comentario.value.trim()) {
    alert(`Comentario enviado: "${comentario.value}"`)
    comentario.value = ''
  } else {
    alert("Por favor, escribe algo antes de enviar.")
  }
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
    <div class="inicio-cuidador">
      <h1>¡Hola, {{ nombre }}! 👋</h1>
      <button @click="logout" class="logout">Cerrar sesión</button>
      <p>Estas son las tareas asignadas para hoy por tu terapeuta.</p>
  
      <section class="tareas">
        <h2>Tareas para hoy</h2>
        <ul>
          <li><input type="checkbox" /> Ejercicios de motricidad fina – 10 min</li>
          <li><input type="checkbox" /> Estimulación sensorial con texturas</li>
          <li><input type="checkbox" /> Revisión de hábitos de higiene</li>
        </ul>
      </section>
  
      <section class="proxima-sesion">
        <h2>Próxima sesión</h2>
        <p><strong>Miércoles, 4:00 PM</strong> con la terapeuta Claudia</p>
      </section>
  
      <section class="comentario">
        <h2>Comentario para el terapeuta</h2>
        <textarea v-model="comentario" placeholder="¿Cómo te fue hoy?"></textarea>
        <button @click="enviarComentario">Enviar comentario</button>
      </section>
    </div>
  </template>
  
  <style scoped>
  .inicio-cuidador {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    font-family: sans-serif;
  }
  h1 {
    font-size: 2rem;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 0.5rem;
  }
  textarea {
    width: 100%;
    min-height: 80px;
    margin-top: 0.5rem;
  }
  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  button:hover {
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
  