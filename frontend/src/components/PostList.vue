<script setup>
import { ref } from "vue";

let posts = ref([]);
const fetchedPosts = fetch("http://localhost:3001/post/all")
  .then((response) => response.json())
  .then((fetchedObject) => {
    posts.value = fetchedObject.posts;
  })
  .then(() => {
    console.log(posts);
  });
</script>

<template>
  <div class="col-md-8 p-3 pt-5">
    <div
      v-for="post in posts"
      class="shadow w-100 bg-light p-2 rounded my-4 mx-auto row mt-2"
    >
      <div class="d-flex align-items-center">
        <h1 class="w-75">{{ post.posttitle }}</h1>
        <div class="w-25">
          <div class="d-flex justify-content-end align-items-center">
            <span class="align-middle">{{ post.username }}</span>

            <span class="ms-2 align-middle" style="font-size: 14px">
              {{ post.timeofcreation }}
            </span>
            <span class="ms-2 align-middle" style="font-size: 14px">
              {{ post.posttype }}
            </span>
          </div>
        </div>
      </div>
      <div class="pb-3" style="font-size: 18px">
        {{ post.postdescription }}
      </div>
      <hr class="w-75 mx-auto" />
      <div class="d-flex justify-content-start pb-1">
        <div class="mx-2">{{ post.programename }}</div>
        <div class="mx-2">{{ post.abbreviationcourse }}</div>
        <div class="mx-2">{{ posts.categoryname }}</div>
      </div>
    </div>
  </div>
</template>
