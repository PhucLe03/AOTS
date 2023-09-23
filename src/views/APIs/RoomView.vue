<template>
  <div class="hello">
    <h1>Rooms list</h1>
    <!-- <button @click="fetchData">Fetch</button> -->
    <div>
      <table style="width: 100%">
        <tr>
          <th>Name</th>
          <th>Group</th>
          <th>Type</th>
          <th>Price</th>
          <th>Deposit</th>
          <th>Debt</th>
          <th>Status</th>
          <!-- <th>Services</th> -->
        </tr>
        <tr v-for="item in info" :key="item._id">
          <td>
            <a :href="'/api/room/' + item._id">{{ item.name }}</a>
          </td>
          <td>
            {{ item.group }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            {{ item.deposit }}
          </td>
          <td>
            {{ item.debt }}
          </td>
          <td>
            {{ item.status }}
          </td>
          <!-- <td>
            <a :href="'/api/room/' + item._id + '/services'">List</a>
          </td> -->
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import controller from '@/utils/controller';

export default {
  name: "RoomView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
    };
  },
  async created() {
    this.info = await controller.getRooms();
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
