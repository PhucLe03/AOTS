<template>
  <div class="hello">
    <h1>Renter Profile</h1>
    <h4>
      This is the renter profile page. Every information about a specific renter
      should be here.
    </h4>
    <h3 style="color: red">Renter: {{ info.name }}</h3>
    <div>
      <table style="width: 100%;">
        <tr>
          <th>Birthday</th>
          <th>Province</th>
          <th>District</th>
          <th>Commune</th>
          <th>Room</th>
        </tr>
        <tr>
          <td>
            {{ info.birthday }}
          </td>
          <td>
            {{ info.province }}
          </td>
          <td>
            {{ info.district }}
          </td>
          <td>
            {{ info.commune }}
          </td>
          <td>
            {{ info.room }}
            <!-- <a :href="'/api/room/' + item.room._id">{{ info.room }}</a> -->
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "UserProfileView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
    };
  },
  created() {
    const API_URL = "http://localhost:1234/api/user/" + this.$route.params.id;
    axios
      .get(API_URL)
      .then((response) => (this.info = response.data))
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
