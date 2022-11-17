<script >
const loggedIn = true

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
}


</script>

<template>
  <div class="col-md-8">
    <div class=" list-group">
      <li class="list-group-item flex-column align-items-start border border-2 border-dark rounded mb-1"
        v-for="post in posts">
        <div class="d-flex justify-content-between ">
          <h5 class="mb-1 ">{{ post.title }}</h5>
          <div class="btn-group " role="group " aria-label="Basic example ">
            <div class="border border-dark p-1 m-1">{{ post.smjer }}</div>
            <div class="border border-dark p-1 m-1">{{ post.predmet }}</div>
            <div class="border border-dark p-1 m-1">{{ post.kategorija }}</div>
          </div>

        </div>
        <p class="mb-1 ">{{ post.text }}</p>
        <small class="text-muted ">{{ post.author }}</small>
        <div class="d-flex justify-content-between">

          <small class="text-muted " v-if="loggedIn">{{ post.email }}</small>
          <h6 class="pull-right font-weight-bold">{{ post.tip }}</h6>
        </div>
      </li>
    </div>
  </div>
</template>