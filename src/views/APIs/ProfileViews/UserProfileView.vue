<template>
  <div class="hello" :to="{ params: { pageTitle: `{ info.name }` } }">
    <h1>Renter Profile</h1>

    <h4>
      This is the renter profile page. Every information about a specific renter
      should be here.
    </h4>
    <h3 style="color: red">Renter: {{ info.name }}</h3>
    <div>
      <table style="width: 100%">
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
import controller from '@/utils/controller';

export default {
  name: "UserProfileView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
    };
  },
  meta: {
    title: "Hello",
  },
  async created() {
    this.info = await controller.getUserByID(this.$route.params.id);
    controller.setTitle("Renter "+this.info.name);
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
