<script setup>
import { useCookies } from "vue3-cookies";
import { ref } from "vue";
import { useRouter } from "vue-router";
const { cookies } = useCookies();
const username = ref("");
const password = ref("");
const email = ref("");
const name = ref("");
const surname = ref("");
const router = useRouter();
const image = ref(null);
const handleRegister = () => {
  if (!email.value.endsWith("@fer.hr")) {
    alert("Please enter a valid email address!");
    return;
  }

  var input = document.querySelector('input[type="file"]');

  if (input.files[0].size > 2097152) {
    alert("Image is too big!");
    return;
  }

  var data = new FormData();
  data.append("file", input.files[0]);
  data.append("name", name.value);
  data.append("surname", surname.value);
  data.append("username", username.value);
  data.append("email", email.value);
  data.append("password", password.value);

  fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {},
    body: data,
  }).then((res) => {
    console.log(res);
    if (res.status === 201) {
      router.push({ name: "login" });
      return;
    } else {
      alert("Unable to register!");
      return;
    }
  });
};

if (cookies.get("token")) {
  router.push("/");
}
</script>

<template>
  <body class="bg-dark h-100">
    <div class="wrap d-flex justify-content-center align-items-center h-100">
      <div class="card login-form">
        <div class="card-body">
          <h2 class="card-title text-center">Please register!</h2>
          <form class="row g-3" @submit.prevent="handleRegister">
            <div class="col-md-6">
              <label for="name " class="form-label">Name</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="name"
                id="name "
                placeholder="Enter your name"
                maxlength="20"
                minlength="2"
              />
            </div>
            <div class="col-md-6">
              <label for="surname" class="form-label">Surname</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="surname"
                id="surname"
                placeholder="Enter your surname"
                maxlength="20"
                minlength="2"
              />
            </div>
            <div class="col-12">
              <label for="avatar" class="form-label mx-2">Avatar</label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                ref="image"
                class="mx-3"
              />
            </div>
            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                required
                class="form-control"
                v-model="email"
                id="email"
                placeholder="Enter your email"
                maxlength="30"
                minlength="8"
              />
            </div>
            <div class="col-12">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="username"
                id="username"
                placeholder="This is how others will see you"
                maxlength="20"
                minlength="3"
              />
            </div>
            <div class="col-12">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                required
                class="form-control"
                v-model="password"
                id="password"
                placeholder="Please choose your password wisely!"
                maxlength="30"
                minlength="8"
              />
              <button type="submit" class="btn btn-dark w-100 m-1">
                Register
              </button>
            </div>
          </form>
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
