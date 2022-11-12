<script setup>
import Leaderboard from '../components/Leaderboard.vue'
import PostList from '../components/PostList.vue'
</script>

<template>
<body class="w-100">
  <div class="m-1">
    <div class="btn-group">
      <h5>FILTER BY: </h5>
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        SMJER
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">R</a></li>
        <li><a class="dropdown-item" href="#">E</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>

    <div class="btn-group">
      <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        PREDMET
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">ELEKRU</a></li>
        <li><a class="dropdown-item" href="#">ASP</a></li>
        <li><a class="dropdown-item" href="#">KOMMRE</a></li>
      </ul>
    </div>

    <div class="btn-group">
      <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        KATEGORIJA
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">LAB1</a></li>
        <li><a class="dropdown-item" href="#">MI</a></li>
        <li><a class="dropdown-item" href="#">LJIR</a></li>
      </ul>
    </div>
  </div>

  <div class="row p-1 w-100">
    <PostList />
    <Leaderboard />
  </div>

  <footer class="bg-dark text-white text-lg-start fixed-bottom ">
    <div class="text-center ">
      <h5 class="text-uppercase ">Turbulent Tech</h5>
    </div>
  </footer>
</body>
</template>

<style>
</style>