<template>
  <div class="hello">
    <h1>Renters list</h1>
    <!-- <button @click="fetchData">Fetch</button> -->
    <div>
      <table style="width: 100%">
        <tr>
          <th>Name</th>
          <th>Birthday</th>
          <th>Province</th>
          <th>District</th>
          <th>Commune</th>
          <th>Room</th>
        </tr>
        <tr v-for="item in info" :key="item._id">
          <td>
            <a :href="'/api/renter/' + item._id">{{ item.name }}</a>
          </td>
          <td>
            {{ item.birthday }}
          </td>
          <td>
            {{ item.province }}
          </td>
          <td>
            {{ item.district }}
          </td>
          <td>
            {{ item.commune }}
          </td>
          <td>
            {{ item.room }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import controller from '@/utils/controller';

export default {
  name: "UserView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
    };
  },
  async created() {
    this.info = await controller.getUsers();
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
a {
  color: red;
}
table,
th,
td {
  align-tracks: center;
  border: 1px solid black;
}
</style>
