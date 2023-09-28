<template>
  <div class="hello">
    <h1>Room Services list</h1>
    <!-- <button @click="fetchData">Fetch</button> -->
    <div>
      <table style="width: 100%">
        <tr>
          <th>Name</th>
          <th>Unit</th>
          <th>Price</th>
        </tr>
        <tr v-for="item in info" :key="item._id">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.unit }}
          </td>
          <td>
            {{ item.price }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomServicesView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
    };
  },
  created() {
    const API_URL = "http://localhost:3333/api/room/" + this.$route.params.id + "/services";
    axios
      .get(API_URL)
      .then((response) => (this.info = response.data))
      .catch((error) => {
        console.error("Error: ", error);
      });
  },

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
table,
th,
td {
  align-tracks: center;
  border: 1px solid black;
}
</style>
