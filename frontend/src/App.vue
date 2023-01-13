<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";

const router = useRouter();
const { cookies } = useCookies();
const token = cookies.get("token");
const handleLogout = () => {
  cookies.remove("token");
  router.push("/login");
  router.go(0);
};
if (token) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/verify`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((res) => {
    if (!res.status == 200) {
      handleLogout();
    }
  });
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Sinappsa</RouterLink>
      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
        aria-controls="nav"
        aria-label="Expand Navigation"
      >
        <div class="navbar-toggler-icon"></div>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Naslovna</RouterLink>
          </li>
          <li class="nav-item" v-if="!token">
            <RouterLink to="/login" class="nav-link">Prijava</RouterLink>
          </li>
          <li class="nav-item" v-if="!token">
            <RouterLink to="/register" class="nav-link"
              >Registracija</RouterLink
            >
          </li>
          <li class="nav-item" v-if="token">
            <RouterLink to="/profile" class="nav-link">Moj Profil</RouterLink>
          </li>
          <li class="nav-item" v-if="token">
            <button
              @click="handleLogout"
              class="nav-link btn btn-outline-secondary"
            >
              Odjava
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
