<template>
    <div class="admin">
      <button @click="logout" class="logout">Cerrar sesión</button>
      <h2>Asignar cuidadores a terapeutas</h2>
  
      <label>Terapeuta</label>
      <select v-model="terapeutaSeleccionado">
        <option v-for="t in terapeutas" :value="t.id">{{ t.nombre }}</option>
      </select>
  
      <label>Cuidador</label>
      <select v-model="cuidadorSeleccionado">
        <option v-for="c in cuidadores" :value="c.id">{{ c.nombre }}</option>
      </select>
  
      <button @click="asignar">Asignar</button>
      <p v-if="mensaje">{{ mensaje }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabase'
  import { useRouter } from 'vue-router'
  
  const terapeutas = ref([])
  const cuidadores = ref([])
  const terapeutaSeleccionado = ref('')
  const cuidadorSeleccionado = ref('')
  const mensaje = ref('')
  const router = useRouter()
  
  onMounted(async () => {
    const { data: t } = await supabase.from('perfiles').select('id, nombre').eq('rol', 'terapeuta')
    const { data: c } = await supabase.from('perfiles').select('id, nombre').eq('rol', 'cuidador')
    terapeutas.value = t
    cuidadores.value = c
  })
  
  async function asignar() {
    const { error } = await supabase.from('asignaciones').insert({
      terapeuta_id: terapeutaSeleccionado.value,
      cuidador_id: cuidadorSeleccionado.value,
    })
  
    mensaje.value = error ? 'Error al asignar' : 'Asignación realizada correctamente'
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
}
  </script>
  
  <style scoped>
  .admin {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
  }
  select, button {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
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
  