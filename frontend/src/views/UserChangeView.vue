<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const router = useRouter();
const username = ref("");
const password = ref("");
const newPassword = ref("");
const user = ref({});
const { cookies } = useCookies();
const currentUsername = cookies.get("username");

fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${currentUsername}`)
  .then((res) => res.json())
  .then((res) => {
    user.value = res;
    console.log(user.value);
  });

const handleChange = () => {
  let sendUsername = "";
  let sendPassword = "";
  if (username.value != "") sendUsername = username.value;
  if (password.value != "") sendPassword = newPassword.value;
  const body = {
    userId: user.value.userid,
    newUsername: sendUsername,
    newPassword: sendPassword,
    currentPassword: password.value,
  };
  console.log(body);
  fetch(`${import.meta.env.VITE_BACKEND_URL}/user/change`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log(res);
      if (!(res.status == 200)) {
        alert("Couldn't execute!");
      }
      return;
    })
    .then(() => {
      cookies.set("username", username.value);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const backToHomepage = () => {
  router.push("/");
};
</script>

<template>
  <body class="bg-dark h-100">
    <div
      class="wrap d-flex justify-content-center align-items-center text-align-center h-100"
    >
      <div class="card login-form">
        <div class="card-body">
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-labeled btn-danger mx-1"
              @click="backToHomepage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
              </svg>
            </button>
          </div>

          <h2 class="card-title text-center">
            Change your username and password
          </h2>
          <div class="card-text">
            <div class="row g-3">
              <div class="col-12">
                <label for="username">New username</label>
                <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  id="newUsername"
                  placeholder="Leave empty if you don't want to change your username..."
                />
              </div>

              <div class="col-12">
                <label for="password">New password</label>
                <input
                  type="password"
                  v-model="newPassword"
                  class="form-control"
                  id="newPassword"
                  placeholder="Leave empty if you don't want to change your current password..."
                />
              </div>

              <div class="col-12">
                <label for="password">Current password</label>
                <input
                  required
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your current password here to confirm changes!"
                />
              </div>

              <button @click="handleChange" class="btn btn-dark w-100 m-1">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
