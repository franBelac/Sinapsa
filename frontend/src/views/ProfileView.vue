<script setup>
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { cookies } = useCookies();

if (!cookies.get("token")) {
  router.push("/");
}

const user = ref({
  username: "username",
  firstname: "name",
  lastname: "lastname",
  email: "email",
});

const posts = ref([]);

const realUsername = cookies.get("username");

fetch(`http://localhost:3001/user/${realUsername}`)
  .then((res) => res.json())
  .then((res) => {
    user.value = res;
  });

fetch(`http://localhost:3001/post/user/${realUsername}`)
  .then((res) => res.json())
  .then((res) => {
    posts.value = res.posts;
  });

function pushWithQuery(query) {
  router.push({
    name: "post",
    query: {
      ...route.query,
      ...query,
    },
    params: {
      postId: query,
    },
  });
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-3 p-3 pt-5">
        <img
          class="rounded-circle shadow mx-auto d-block"
          alt="avatar2"
          src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
        />
        <div class="mt-4 form-group text-center">
          <label>{{ user.username }}</label
          ><br />
          <label>{{ user.firstname }} {{ user.lastname }}</label
          ><br />
          <label>{{ user.email }}</label>
        </div>
      </div>

      <div class="col-12 col-lg-9 p-3 pt-5">
        <div
          v-for="post in posts"
          class="shadow w-100 bg-light p-2 rounded my-4 mx-auto row mt-2"
        >
          <div class="d-flex align-items-center">
            <h1 class="w-75">{{ post.posttitle }}</h1>
            <button class="btn btn-primary" @click="pushWithQuery(post.postid)">
              Otvori
            </button>
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
            <div class="mx-2">{{ post.categoryname }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
