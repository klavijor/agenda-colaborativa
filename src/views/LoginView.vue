<template>
    <div class="login">
      <h1>Iniciar sesión</h1>
      <input v-model="email" placeholder="Correo" />
      <input v-model="password" placeholder="Contraseña" type="password" />
      <button @click="login">Ingresar</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { supabase } from '../lib/supabase'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  async function login() {
  error.value = ''

  // Iniciar sesión
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (loginError) {
    error.value = 'Credenciales incorrectas'
    return
  }

  // Obtener perfil
  const { data: perfil, error: perfilError } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', data.user.id)
    .maybeSingle()

  if (perfilError) {
    error.value = 'Error al obtener el perfil'
    return
  }

  if (perfil?.rol === 'terapeuta') {
    router.push('/inicio')
  } else if (perfil?.rol === 'cuidador') {
    router.push('/cuidador')
  } else if (perfil?.rol === 'admin') {
    router.push('/admin')
  }
  else {
    error.value = 'Usuario sin rol asignado'
  }
}

  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 8px;
  }
  </style>
  