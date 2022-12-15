<script setup>
const users = [
  {
    username: "anamarija",
    points: 100,
  },
  {
    username: "kemal",
    points: 90,
  },
  {
    username: "serif",
    points: 80,
  },
  {
    username: "mehmed",
    points: 70,
  },
];
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
        <tr v-for="user in users">
          <th scope="row">{{ users.indexOf(user) + 1 }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
