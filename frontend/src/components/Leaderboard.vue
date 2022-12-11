<script setup>
// const users = await fetch('http://localhost:3000/leaderboard')
//   .then(res => res.json())
//   .then(data => {
//     return data
//   })

const users = [
  "user1", "user2", "user3", "user3", "user4", "user5", "user6"
]

</script>

<template>
  <div class="col-md-4">
  <table class="table table-stripped table-hover mb-5 rounded rounded-3 overflow-hidden">
        <thead class="table-dark">
          <tr>
            <th scope="col">Rang</th>
            <th scope="col">Username</th>
            <th scope="col">Bodovi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Kemal Malovcic</td>
            <td>88,110</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Milos Bojanic</td>
            <td>72,400</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Muharem Serbezovski</td>
            <td>52,300</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Sinan Sakic</td>
            <td>42,300</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Ljuba Alicic</td>
            <td>32,300</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Saban Saulic</td>
            <td>22,300</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Dzej</td>
            <td>12,300</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>Seki Turkovic</td>
            <td>2,300</td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td>Sadik Hasanovic</td>
            <td>1,300</td>
          </tr>
        </tbody>
      </table>
    </div>

 <!-- <div class="col-md-4 border border-2 border-dark rounded">
    <h5 class="font-weight-bold p-1 m-1">RANG LISTA</h5>
    <ul class="list-group list-group-flush ">
      <li class="list-group-item " v-for="username in users">{{ username }}</li>
    </ul>
  </div>
 -->
</template>