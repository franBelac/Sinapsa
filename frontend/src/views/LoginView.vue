<script>
import { ref } from 'vue'
export default {
  setup() {

    const username = ref('')
    const password = ref('')

    const handleLogin = () => {

      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })

    }

    return {
      handleLogin,
      username,
      password
    }
  },
}
</script>

<template>
<body class="bg-dark h-100">

  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="card login-form">
      <div class="card-body">
        <h2 class="card-title text-center">Please login!</h2>
        <div class="card-text">
          <form @submit.prevent="handleLogin" class="row g-3">
            <div class="col-12">
              <label for="username">User name</label>
              <input type="text" v-model="username" class="form-control" id="username" placeholder="Enter your username here...">

            </div>
            <div class="col-12">
              <label for="password">Password</label>
              <input type="password" v-model="password" class="form-control" id="password" placeholder="Enter your password here...">
            </div>
            <button type="submit" class="btn btn-dark w-100 m-1">Log In</button>
          </form>

        </div>
      </div>
    </div>
  </div>

</body>
</template>

<style>

</style>
