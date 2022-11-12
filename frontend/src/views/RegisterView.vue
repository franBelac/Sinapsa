<script >

import { ref } from 'vue'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const name = ref('')
    const surname = ref('')

    const handleRegister = () => {


      if (!email.value.endsWith('@fer.hr')) {
        alert('Please enter a valid email address!')
        return
      }

      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          email: email.value,
          name: name.value,
          surname: surname.value
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }

    return {
      handleRegister,
      username,
      password,
      name,
      surname,
      email
    }
  }
}

</script>

<template>

  <body class="bg-dark h-100">

    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="card login-form">
        <div class="card-body">
          <h2 class="card-title text-center">Please register!</h2>
          <form class="row g-3" @submit.prevent="handleRegister">
            <div class="col-md-6">
              <label for="name " class="form-label ">Name</label>
              <input type="text" required class="form-control" v-model="name" id="name " placeholder="Enter your name" maxlength="20" minlength="2">

            </div>
            <div class="col-md-6">
              <label for="surname" class="form-label">Surname</label>
              <input type="text" required class="form-control" v-model="surname" id="surname" placeholder="Enter your surname" maxlength="20" minlength="2">
            </div>
            <div class=" col-12 ">
              <label for="email" class="form-label">Email</label>
              <input type="email" required class="form-control" v-model="email" id="email" placeholder="Enter your email" maxlength="30" minlength="8">
            </div>
            <div class=" col-12 ">
              <label for="username" class="form-label">Username</label>
              <input type="text" required class="form-control" v-model="username" id="username" placeholder="This is how others will see you" maxlength="20" minlength="3">
            </div>
            <div class=" col-12 ">
              <label for="password" class="form-label">Password</label>
              <input type="password" required class="form-control" v-model="password" id="password"
                placeholder="Please choose your password wisely!" maxlength="30" minlength="8">
              <button type="submit" class="btn btn-dark w-100 m-1">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </body>
</template>

<style>

</style>