<script setup>
import { ref } from "vue";

const leaderboard = ref([]);
const users = fetch("http://localhost:3001/get-leadboard")
  .then((res) => res.json())
  .then((data) => {
    leaderboard.value = data.leadboard;
    console.log(leaderboard.value);
  });
</script>

<template>
  <div class="col-md-4">
    <table
      class="table table-stripped table-hover mb-5 rounded rounded-3 overflow-hidden"
    >
      <thead class="table-dark">
        <tr>
          <th scope="col">Rang</th>
          <th scope="col">Username</th>
          <th scope="col">Bodovi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in leaderboard">
          <th scope="row">{{ leaderboard.indexOf(user) + 1 }}</th>
          <td>{{ user.user.username }}</td>
          <td>{{ user.grade }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
