<script setup>
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from 'pinia'
import { useCredentialsStore } from './stores/credentials'
import { useCookies } from 'vue3-cookies'
const credentialsStore = useCredentialsStore()
const { username, token } = storeToRefs(credentialsStore)
const { cookies } = useCookies()
token.value = cookies.get('token')
username.value = cookies.get('username')
const handleLogout = () => {
  credentialsStore.$reset()
  cookies.remove('token')
  cookies.remove('username')
}

</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Sinappsa</RouterLink>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav"
        aria-label="Expand Navigation">
        <div class="navbar-toggler-icon"></div>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item" v-if="!token">
            <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </li>
          <li class="nav-item" v-if="!token">
            <RouterLink to="/register" class="nav-link">Register</RouterLink>
          </li>
          <li class="nav-item" v-if="token">
            <button @click="handleLogout" class="nav-link btn btn-outline-secondary">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style>

</style>
