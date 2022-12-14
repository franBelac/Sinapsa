<script setup>
import Leaderboard from "../components/Leaderboard.vue";
import PostList from "../components/PostList.vue";
</script>

<template>
  <body class="w-100">
    <div class="row p-1 w-100">
      <PostList />
      <Leaderboard />
    </div>

    <footer class="bg-dark text-white text-lg-start fixed-bottom">
      <div class="text-center">
        <h5 class="text-uppercase">Turbulent Tech</h5>
      </div>
    </footer>
  </body>
</template>
