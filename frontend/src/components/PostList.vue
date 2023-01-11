<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const token = cookies.get("token");
const router = useRouter();
const route = useRoute();
const posts = ref([]);
const predmeti = ref([]);
const kategorije = ref([]);

fetch(`${import.meta.env.VITE_BACKEND_URL}/post/all`)
  .then((response) => response.json())
  .then((fetchedObject) => {
    posts.value = fetchedObject.posts;
  });

fetch(`${import.meta.env.VITE_BACKEND_URL}/info`)
  .then((response) => response.json())
  .then((fetchedObject) => {
    predmeti.value = fetchedObject.courses;
    kategorije.value = fetchedObject.categories;
  });

const currentSmjer = ref("SMJER");

const currentPredmet = ref("PREDMET");

const currentKategorija = ref("KATEGORIJA");

const smjerovi = ["R", "E"];

const setFilter = (filterType, newValue) => {
  console.log(newValue);
  if (filterType === "smjer") {
    currentSmjer.value = newValue;
  } else if (filterType === "predmet") {
    currentPredmet.value = newValue;
  } else if (filterType === "kategorija") {
    currentKategorija.value = newValue;
  }
};

const filter = () => {
  if (currentSmjer.value == "SMJER") {
    currentSmjer.value = null;
  }
  if (currentPredmet.value == "PREDMET") {
    currentPredmet.value = null;
  }
  if (currentKategorija.value == "KATEGORIJA") {
    currentKategorija.value = null;
  }
  const filterObject = {
    programename: currentSmjer.value,
    abbreviationcourse: currentPredmet.value,
    categoryname: currentKategorija.value,
  };
  fetch(`${import.meta.env.VITE_BACKEND_URL}/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filterObject),
  })
    .then((response) => response.json())
    .then((fetchedObject) => {
      console.log(fetchedObject);
      posts.value = fetchedObject.posts;
    });

  currentSmjer.value = "SMJER";
  currentPredmet.value = "PREDMET";
  currentKategorija.value = "KATEGORIJA";
};

const newPost = () => {
  router.push({
    name: "create",
  });
};

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

const getUrl = (avatar) => `${import.meta.env.VITE_BACKEND_URL}/` + avatar;
</script>

<template>
  <div class="m-1">
    <div class="btn-group">
      <h5>FILTRIRAJ PO:</h5>
    </div>
    <div class="btn-group m-1">
      <button
        type="button"
        class="btn btn-dark dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ currentSmjer }}
      </button>
      <ul class="dropdown-menu">
        <li
          class="dropdown-item"
          v-for="smjer in smjerovi"
          @click="setFilter('smjer', smjer)"
        >
          {{ smjer }}
        </li>
      </ul>
    </div>

    <div class="btn-group m-1">
      <button
        type="button"
        class="btn btn-dark dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ currentPredmet }}
      </button>
      <ul class="dropdown-menu">
        <li
          class="dropdown-item"
          v-for="predmet in predmeti"
          @click="setFilter('predmet', predmet)"
        >
          {{ predmet }}
        </li>
      </ul>
    </div>

    <div class="btn-group m-1">
      <button
        type="button"
        class="btn btn-dark dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ currentKategorija }}
      </button>
      <ul class="dropdown-menu">
        <li
          class="dropdown-item"
          v-for="kategorija in kategorije"
          @click="setFilter('kategorija', kategorija)"
        >
          {{ kategorija }}
        </li>
      </ul>
    </div>

    <div class="btn-group m-1">
      <button
        type="button"
        class="btn btn-primary"
        @click="filter"
        aria-expanded="false"
      >
        FILTER
      </button>
    </div>

    <div class="btn-group m-1">
      <button
        type="button"
        class="btn btn-labeled btn-success mx-1"
        v-if="token"
        @click="newPost"
      >
        Novi oglas
      </button>
    </div>
  </div>

  <div class="col-md-8 p-3 pt-5">
    <div
      v-for="post in posts"
      class="shadow w-100 bg-light p-2 rounded my-4 mx-auto row mt-2"
    >
      <div class="d-flex align-items-center row mb-3">
        <div class="d-flex align-items-center row mb-3">
          <div class="col-12 col-md-8 row mb-2">
            <div class="col-4">
              <img
                class="rounded-circle shadow"
                style="height: 75px; width: 75px"
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
              <span class="align-middle mx-1">{{ post.username }}</span>
              <span class="align-middle mx-1">{{ post.email }}</span>

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
            v-if="token"
          >
            Otvori
          </button>
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
</template>
