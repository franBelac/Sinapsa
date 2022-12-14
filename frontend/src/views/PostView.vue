<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";

let proba;
const route = useRoute();
const post = ref({
  postTitle: "posttitle",
  username: "username",
  dateOfCreation: "timeofcreation",
  postType: "posttype",
  postDescription: "postdescription",
});

fetch(`http://localhost:3001/post/distinct/${route.params.postId}`)
  .then((res) => res.json())
  .then((res) => {
    console.log("oke sad ide na post.value", res);
    post.value = res;
  });

const fetchUser = async (id) => {
  console.log("executing fetchUser");
  const res = await fetch(`http://localhost:3001/post/distinct/${id}`);
  const data = await res.json();
  console.log(data);
  post.value = data;
};
</script>

<template>
  <div>
    <div class="w-75 mx-auto shadow rounded bg-light p-4 my-5">
      <div class="d-flex align-items-center">
        <h1 class="w-75">{{ post.postTitle }}</h1>
        <div class="w-25">
          <div class="d-flex justify-content-end align-items-center">
            <a
              href="username.com"
              class="text-decoration-none ms-2"
              style="font-size: 16px"
            >
              <span class="align-middle">{{ post.username }}</span>
            </a>
            <span class="ms-2 align-middle" style="font-size: 14px">
              {{ post.dateOfCreation }}
            </span>
            <span class="ms-2 align-middle" style="font-size: 14px">
              {{ post.postType }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <p class="mt-2 col-12 col-sm-9" style="font-size: 18px">
          {{ post.postDescription }}
        </p>
        <div
          class="col-12 col-sm-3 d-flex align-items-center justify-content-end"
        >
          <button type="button" class="btn btn-labeled btn-success mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              ></path>
            </svg>
          </button>
          <button type="button" class="btn btn-labeled btn-danger mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
        <hr class="w-75 mx-auto mt-2 mt-md-0" />
        <div class="d-flex justify-content-start pb-1">
          <div class="mx-2">Ovo nista</div>
          <div class="mx-2">Nula bodova</div>
          <div class="mx-2">nula</div>
        </div>
      </div>
    </div>

    <div class="w-75 mx-auto">
      <div class="shadow w-100 bg-light p-2 row rounded my-4 mx-auto row">
        <div class="p-3 col-12 col-sm-9" style="font-size: 18px">
          lorem ipsum dolor <br />
          ovaj odg ide kroz vise linija <br />
        </div>
        <div class="col-12 col-sm-3">
          <div class="d-flex justify-content-end align-items-center h-25">
            <a
              href="username.com"
              class="text-decoration-none ms-2"
              style="font-size: 16px"
            >
              <span class="align-middle">username</span>
            </a>
            <span class="ms-2 align-middle" style="font-size: 14px">
              21.12.2021 9:50
            </span>
          </div>
          <div class="h-75 d-flex align-items-center justify-content-end">
            <button type="button" class="btn btn-labeled btn-success mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check2-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"
                />
                <path
                  d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
                />
              </svg>
            </button>
            <button type="button" class="btn btn-labeled btn-danger mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
            <button type="button" class="btn btn-labeled btn-danger mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="text-center text-lg-start text-muted w-100 p-3 mb-3 zindex-fixed"
      style="height: 200px"
    >
      <form class="form-group mx-auto w-75 h-100">
        <textarea
          id="reply"
          class="rounded bg-light mx-auto w-100"
          style="height: 140px"
        ></textarea>
        <div class="d-flex justify-content-end mb-3 h-25">
          <button class="btn btn-success" style="height: 35px">
            Post reply
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
