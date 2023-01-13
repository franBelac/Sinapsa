<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const jwt = cookies.get("token");
if (!jwt) {
  router.push("/login");
  router.go(1);
}

const postId = ref(null);
const title = ref("");
const description = ref("");
const category = ref("Kategorija");
const smjer = ref("Smjer");
const course = ref("Predmet");
const predmeti = ref([]);
const kategorije = ref([]);

if (route.params.postId) {
  postId.value = route.params.postId;
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/post/distinct/${route.params.postId}`
  )
    .then((res) => res.json())
    .then((res) => {
      description.value = res.postdescription;
      title.value = res.posttitle;
    });
}

fetch(`${import.meta.env.VITE_BACKEND_URL}/info`)
  .then((response) => response.json())
  .then((fetchedObject) => {
    predmeti.value = fetchedObject.courses;
    kategorije.value = fetchedObject.categories;
  });

const sendPost = async () => {
  if (title.value === "" || description.value === "") {
    alert("Molimo Vas da popunite sva polja!");
    return;
  }
  if (
    postId.value === null &&
    (category.value === "Kategorija" ||
      smjer.value === "Smjer" ||
      course.value === "Predmet")
  ) {
    alert("Molimo Vas da popunite sva polja!");
    return;
  }
  router.go(-1);
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: postId.value,
      title: title.value,
      description: description.value,
      category: category.value,
      smjer: smjer.value,
      course: course.value,
    }),
  }).then((res) => {
    if (res.status === 201) {
      router.push("/");
      return;
    }
    alert("Couldn't create post");
  });
};

const backToHomepage = () => {
  router.push("/");
};
</script>

<template>
  <form class="mx-auto w-75 w-md-50 rounded border border-4 m-3">
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-danger" @click="backToHomepage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
        <span class="visually-hidden">Button</span>
      </button>
    </div>
    <div class="mb-3 w-75 mx-auto text-center my-3">
      <label for="title" class="form-label">Naslov</label>
      <input
        required
        type="text"
        class="form-control"
        id="title"
        aria-describedby="titleHelp"
        v-model="title"
      />
      <div id="emailHelp" class="form-text">Naslov Vašeg oglasa</div>
    </div>
    <div class="row w-75 mx-auto justify-content-around" v-if="!postId">
      <div class="col-12 col-md-4">
        <label for="title" class="form-label">Smjer</label>
        <select
          required
          class="form-select w-100 mx-auto my-1 my-md-3"
          aria-label="Default select example"
          v-model="smjer"
        >
          <option value="R">Računarstvo</option>
          <option value="E">Elektrotehnika</option>
        </select>
      </div>
      <div class="col-12 col-md-4">
        <label for="title" class="form-label">Predmet</label>
        <select
          required
          class="form-select w-100 mx-auto my-1 my-md-3"
          aria-label="Default select example"
          v-model="course"
        >
          <option v-for="predmet in predmeti">
            {{ predmet }}
          </option>
        </select>
      </div>
      <div class="col-12 col-md-4">
        <label for="title" class="form-label">Kategorija</label>
        <select
          required
          class="form-select w-100 mx-auto my-1 my-md-3"
          aria-label="Default select example"
          v-model="category"
        >
          <option v-for="kategorija in kategorije">
            {{ kategorija }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-3 w-75 mx-auto text-center h-50 mt-3 mb-0">
      <label for="title" class="form-label">Sadržaj</label>
      <textarea
        required
        class="form-control"
        style="height: 150px"
        id="body"
        aria-describedby="bodyHelp"
        v-model="description"
      ></textarea>
      <div id="emailHelp" class="form-text">Sadržaj Vašeg oglasa</div>
    </div>
    <div class="d-flex justify-content-end w-75 mx-auto mb-2">
      <button type="button" class="btn btn-success" @click="sendPost">
        Objavi
      </button>
    </div>
  </form>
</template>
