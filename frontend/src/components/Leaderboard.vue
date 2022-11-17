<script setup>
// const users = await fetch('http://localhost:3000/leaderboard')
//   .then(res => res.json())
//   .then(data => {
//     return data
//   })

const users = [
  "user1", "user2", "user3", "user3", "user4", "user5", "user6"
]

</script>

<template>
  <div class="col-md-4 border border-2 border-dark rounded">
    <h5 class="font-weight-bold p-1 m-1">RANG LISTA</h5>
    <ul class="list-group list-group-flush ">
      <li class="list-group-item " v-for="username in users">{{ username }}</li>
    </ul>
  </div>
</template>