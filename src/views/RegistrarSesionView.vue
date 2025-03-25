<template>
    <div class="registrar-sesion">
      <h2>Registrar sesión</h2>
  
      <label>Cuidador</label>
      <select v-model="cuidadorSeleccionado">
        <option disabled value="">Seleccione un cuidador</option>
        <option v-for="c in cuidadores" :key="c.id" :value="c.id">
          {{ c.nombre }}
        </option>
      </select>
  
      <label>Fecha</label>
      <input type="datetime-local" v-model="fecha" />
  
      <label>Duración (minutos)</label>
      <input type="number" v-model="duracion" />
  
      <label>Notas</label>
      <textarea v-model="notas"></textarea>
  
      <button @click="registrarSesion">Registrar sesión</button>
      <p v-if="mensaje">{{ mensaje }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabase'
  
  const cuidadores = ref([])
  const cuidadorSeleccionado = ref('')
  const fecha = ref('')
  const duracion = ref('')
  const notas = ref('')
  const mensaje = ref('')
  
  onMounted(async () => {
    const { data: userData } = await supabase.auth.getUser()
    const { data } = await supabase
      .from('asignaciones')
      .select('cuidador_id, perfil_cuidador:cuidador_id (nombre, id)')
      .eq('terapeuta_id', userData.user.id)
  
    cuidadores.value = data.map((asignacion) => asignacion.perfil_cuidador)
  })
  
  async function registrarSesion() {
    const { data: userData } = await supabase.auth.getUser()
  
    const { error } = await supabase.from('sesiones').insert({
      terapeuta_id: userData.user.id,
      cuidador_id: cuidadorSeleccionado.value,
      fecha: fecha.value,
      duracion_minutos: duracion.value,
      notas: notas.value,
    })
  
    if (error) {
      mensaje.value = 'Error al registrar sesión'
    } else {
      mensaje.value = 'Sesión registrada correctamente'
      cuidadorSeleccionado.value = ''
      fecha.value = ''
      duracion.value = ''
      notas.value = ''
    }
  }
  </script>
  
  <style scoped>
  .registrar-sesion {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
  }
  input, select, textarea {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  </style>
  