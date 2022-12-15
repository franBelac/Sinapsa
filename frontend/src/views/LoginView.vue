<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCredentialsStore } from "../stores/credentials";
import { useCookies } from "vue3-cookies";
const router = useRouter();
const username = ref("");
const password = ref("");
const credentials = useCredentialsStore();
const { cookies } = useCookies();
const handleLogin = () => {
  fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => {
      if (!(res.status === 200)) {
        alert("Unsuccessful login!");
        throw Error("Unsuccessful login!");
      }
      return res.json();
    })
    .then((res) => {
      credentials.username = username.value;
      credentials.token = res.token;
      cookies.set("token", credentials.token);
      cookies.set("username", credentials.username);
      router.push({ name: "home" });
    })
    .catch((err) => {
      console.log(err);
    });
};

if (cookies.get("token")) {
  router.push("/");
}
</script>

<template>
  <body class="bg-dark h-100">
    <div
      class="wrap d-flex justify-content-center align-items-center text-align-center h-100"
    >
      <div class="card login-form">
        <div class="card-body">
          <h2 class="card-title text-center">Please log in!</h2>
          <div class="card-text">
            <form @submit.prevent="handleLogin" class="row g-3">
              <div class="col-12">
                <label for="username">User name</label>
                <input
                  required
                  type="text"
                  v-model="username"
                  class="form-control"
                  id="username"
                  placeholder="Enter your username here..."
                />
              </div>
              <div class="col-12">
                <label for="password">Password</label>
                <input
                  required
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password here..."
                />
              </div>
              <button type="submit" class="btn btn-dark w-100 m-1">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style>
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
