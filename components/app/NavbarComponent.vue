<template>
    <nav class="navbar">
      <ul>
        <li><NuxtLink to="/">Inicio</NuxtLink></li>
        <li><NuxtLink to="/about">Acerca</NuxtLink></li>
        <li><NuxtLink to="/contact">Contacto</NuxtLink></li>
      </ul>
    </nav>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 1rem;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
  }
  
  .navbar a:hover {
    text-decoration: underline;
  }
  </style>
  