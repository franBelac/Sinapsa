<script setup>
import Leaderboard from '../components/Leaderboard.vue'
import PostList from '../components/PostList.vue'
import { ref } from 'vue'
const fetchedPosts = [
  {
    id: 1,
    title: 'Post 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    author: "user1",
    date: '2021-05-01',
    email: "ds12345@fer.hr",
    smjer: "R",
    predmet: "Matan 1",
    tip: "Tražim",
    kategorija: "Laboratorijske vježbe",
  },
  {
    id: 2,
    title: 'Post 2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    author: "user1",
    date: '2021-05-01',
    email: "ds12345@fer.hr",
    smjer: "E",
    predmet: "Uvod u programiranje",
    tip: "Nudim",
    kategorija: "Međuispit",
  },
  {
    id: 3,
    title: 'Post 3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. fdgdfgjbdfkghfdghfhiughoeui',
    author: "user1",
    date: '2021-05-01',
    email: "ds12345@fer.hr",
    smjer: "E",
    predmet: "Prevođenje programskih jezika",
    tip: "Tražim",
    kategorija: "Laboratorijske vježbe",
  }
]

let posts = ref(fetchedPosts)

const currentSmjer = ref('SMJER')

const currentPredmet = ref('PREDMET')

const currentTip = ref('TIP')

const currentKategorija = ref('KATEGORIJA')

const smjerovi = ["R", "E"]

const predmeti = ["Matan 1", "Uvod u programiranje", "Prevođenje programskih jezika"]

const kategorije = ["Međuispit", "Laboratorijske vježbe"]

const tipovi = ["Nudim", "Tražim"]

const filter = (filterVarijabla, tipFiltriranja) => {
  if (tipFiltriranja == "smjer") {
    currentSmjer.value = filterVarijabla
    posts.value = posts.value.filter(post => post.smjer == filterVarijabla)
  }
  else if (tipFiltriranja == "predmet") {
    currentPredmet.value = filterVarijabla
    posts.value = posts.value.filter(post => post.predmet == filterVarijabla)
  }
  else if (tipFiltriranja == "kategorija") {
    currentKategorija.value = filterVarijabla
    posts.value = posts.value.filter(post => post.kategorija == filterVarijabla)
  } else if (tipFiltriranja == "tip") {
    currentTip.value = filterVarijabla
    posts.value = posts.value.filter(post => post.tip == filterVarijabla)
  }
}

const reset = () => {
  currentSmjer.value = "SMJER"
  currentPredmet.value = "PREDMET"
  currentKategorija.value = "KATEGORIJA"
  currentTip.value = "TIP"
  posts.value = fetchedPosts
}

</script>

<template>

  <body class="w-100">
    <div class="m-1">
      <div class="btn-group">
        <h5>FILTER BY: </h5>
      </div>
      <div class="btn-group m-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {{ currentSmjer }}
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" v-for="smjer in smjerovi" @click="filter(smjer, 'smjer')">{{ smjer }}</li>

        </ul>
      </div>

      <div class="btn-group m-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {{ currentPredmet }}
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" v-for="predmet in predmeti" @click="filter(predmet, 'predmet')">{{ predmet }}</li>

        </ul>
      </div>

      <div class="btn-group m-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {{ currentKategorija }}
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" v-for="kategorija in kategorije" @click="filter(kategorija, 'kategorija')">{{
              kategorija
          }}</li>
        </ul>
      </div>

      <div class="btn-group m-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {{ currentTip }}
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" v-for="tip in tipovi" @click="filter(tip, 'tip')">
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>

    <div class="btn-group m-1">
      <button type="button" class="btn btn-dark" @click="reset" aria-expanded="false">
        RESET
      </button>
    </div>

    <div class="row p-1 w-100">
      <PostList :posts="posts" />
      <Leaderboard />
    </div>

    <footer class="bg-dark text-white text-lg-start fixed-bottom">
      <div class="text-center ">
        <h5 class="text-uppercase ">Turbulent Tech</h5>
      </div>
    </footer>
  </body>
</template>

<style>

</style>