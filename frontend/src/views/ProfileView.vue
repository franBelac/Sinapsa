<script setup>
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { cookies } = useCookies();
const jwt = cookies.get("token");

if (!jwt) {
  router.push("/login");
  router.go(1);
}

const user = ref({
  username: "username",
  firstname: "name",
  lastname: "lastname",
  email: "email",
  userid: 0,
});

const posts = ref([]);
const replies = ref([]);
fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: jwt,
  },
})
  .then((res) => res.json())
  .then((res) => {
    user.value = res.user;
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/replies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        replies.value = res;
      });
  });

fetch(`${import.meta.env.VITE_BACKEND_URL}/post/user`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: jwt,
  },
})
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

const newPost = () => {
  router.push({
    name: "create",
  });
};

const editProfile = () => {
  router.push({
    name: "updateProfile",
  });
};

const getUrl = (avatar) => `${import.meta.env.VITE_BACKEND_URL}/` + avatar;
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-3 p-3 pt-5">
        <img
          class="rounded-circle shadow mx-auto d-block"
          style="height: 150px; width: 150px"
          alt="avatar2"
          :src="getUrl(user.useravatar)"
        />
        <div class="mt-4 form-group text-center">
          <label>{{ user.username }}</label
          ><br />
          <label>{{ user.firstname }} {{ user.lastname }}</label
          ><br />
          <p>{{ user.email }}</p>
          <button
            class="btn btn-labeled btn-success mx-1 my-1"
            @click="newPost"
          >
            Novi oglas
          </button>
          <button
            class="btn btn-labeled btn-success mx-1 my-1"
            @click="editProfile"
          >
            Uredi profil
          </button>
        </div>
      </div>

      <div class="col-12 col-lg-9 p-3 pt-5">
        <h1 class="mb-5">Moji oglasi</h1>
        <div
          v-for="post in posts"
          class="shadow w-100 bg-light p-2 rounded my-4 mx-auto row mt-2"
        >
          <div class="d-flex align-items-center row mb-3">
            <div class="col-12 col-md-8 row mb-2">
              <div class="col-4">
                <img
                  class="rounded-circle shadow"
                  style="height: 50px; width: 50px"
                  alt="avatar2"
                  :src="getUrl(post.useravatar)"
                />
              </div>
              <h1 class="col-8 d-flex align-items-center">
                {{ post.posttitle }}
              </h1>
            </div>
            <div class="col-7 col-md-3">
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
            <button
              class="btn btn-primary col-4 col-md-1 mx-1"
              @click="pushWithQuery(post.postid)"
            >
              Otvori
            </button>
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
        <hr class="w-100 my-5" />
        <h1 class="mb-5">Moji upiti</h1>
        <div
          class="shadow w-100 bg-light p-3 rounded my-4 mx-auto row mt-2 mb-3"
          v-for="reply in replies"
        >
          <div class="col-12 col-md-9 p-2">
            {{ reply.replytext }}
          </div>
          <div class="col-12 col-md-3">
            <button
              type="button"
              class="btn btn-labeled btn-primary mx-1"
              @click="pushWithQuery(reply.postid)"
            >
              Otvori Objavu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
