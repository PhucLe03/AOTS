<template>
  <div class="hello">
    <h1>Room Info</h1>
    <h4>
      This is the room info page. Every information about a specific room should
      be here.
    </h4>
    <h3 style="color: red">Room: {{ info.name }}</h3>
    <div>
      <table style="width: 100%">
        <tr>
          <th>Group</th>
          <th>Type</th>
          <th>Price</th>
          <th>Deposit</th>
          <th>Debt</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>{{ info.group }}</td>
          <td>{{ info.type }}</td>
          <td>{{ info.price }}</td>
          <td>{{ info.deposit }}</td>
          <td>{{ info.debt }}</td>
          <td>{{ info.status }}</td>
        </tr>
      </table>
      <h3>Services List</h3>
      <!-- <h4>{{ serinfo }}</h4> -->
      <table style="width: 100%">
        <tr>
          <th>Service's name</th>
          <th>Unit</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tr v-for="(item, idx) in serinfo" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.price }}</td>
          <td>{{ info.services[idx].quantity }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfileView",
  data() {
    return {
      info: [],
      serinfo: [],
      error: String,
      response: {},
      response1: {},
    };
  },
  created() {
    const API_URL = "http://localhost:1234/api/room/" + this.$route.params.id;
    axios
      .get(API_URL)
      .then((response) => {
        this.info = response.data;
        const theTitle = document.querySelector("head title");
        theTitle.textContent = "Room " + response.data.name;
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    const servicesAPI_URL = API_URL + "/services";
    axios
      .get(servicesAPI_URL)
      .then((response1) => (this.serinfo = response1.data))
      .catch((error) => {
        console.error("Error: ", error);
      });
  },
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table,
th,
td {
  align-tracks: center;
  border: 1px solid black;
}

table {
  margin: 40px 0 0;
}
</style>
