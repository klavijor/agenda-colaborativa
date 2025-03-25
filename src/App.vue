<template>
  <div id="app">
    <h1>AgendApp</h1>
    <p>¡Esta es tu primera PWA hecha con Vue.js! 🎉</p>
    <button @click="handleClick">Haz clic aquí</button>
    <p v-if="clicked">¡Funciona! Ahora puedes instalarla en tu celular 🚀</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clicked = ref(false)

function handleClick() {
  clicked.value = true
}
</script>

<style scoped>
#app {
  text-align: center;
  padding: 2rem;
  font-family: Avenir, sans-serif;
}
button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #369d6e;
}
</style>
