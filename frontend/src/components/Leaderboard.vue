<script setup>
import LeaderboardUser from './LeaderboardUser.vue'

// const users = await fetch('http://localhost:3000/leaderboard')
//   .then(res => res.json())
//   .then(data => {
//     return data
//   })

</script>

<template>
    <div class="col-md-4 border border-2 border-dark rounded">
      <h5 class="font-weight-bold ">RANG LISTA</h5>
      <ul class="list-group list-group-flush ">
        <LeaderboardUser />
        <LeaderboardUser />
        <LeaderboardUser />
        <LeaderboardUser />
      </ul>
    </div>
</template>