<template>
  <div class="hello">
    <h1>Room Info</h1>
    <h4>
      This is the room info page. Every information about a specific room should
      be here.
    </h4>
    <h3 style="color: red">Room: {{ info.name }}</h3>
    <div>
      <table style="margin: auto;">
        <tr>
          <th>Group</th>
          <th>Type</th>
          <th>Price</th>
          <th>Deposit</th>
          <th>Debt</th>
          <th>Renter</th>
          <th>Status</th>
          <th>Date of hire</th>
          <th>Expiration date</th>
        </tr>
        <tr>
          <td>{{ info.group }}</td>
          <td>{{ info.type }}</td>
          <td>{{ info.price }}</td>
          <td>{{ info.deposit }}</td>
          <td>{{ info.debt }}</td>
          <td>{{ info.renter }} / {{ info.capacity }}</td>
          <td>{{ info.status }}</td>
          <td>{{ info.day_of_hire_format }}</td>
          <td>{{ info.expiration_date_format }}</td>
        </tr>
      </table>
      <h3>Services List</h3>
      <!-- <h4>{{ serinfo }}</h4> -->
      <div v-if="nullservice">
        <h3>No service found.</h3>
      </div>
      <div v-else>
        <table style="margin: auto; width: 40%;">
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
  </div>
</template>

<script>
import controller from "@/utils/controller";

// const nullhandler = {
//   name : 0,
//   unit : 0,
//   price : 0,
// }

export default {
  name: "UserProfileView",
  data() {
    return {
      info: [],
      serinfo: [],
      error: String,
      response: {},
      response1: {},
      nullservice: Boolean,
    };
  },
  async created() {
    this.nullservice = true;
    // this.serinfo = nullhandler;
    var roomid = this.$route.params.id;
    this.info = await controller.getRoomByID(roomid);
    controller.setTitle("Room " + this.info.name);
    this.serinfo = await controller.getRoomServices(roomid);
    console.log(this.serinfo)
    if (this.serinfo !== null) {
      // this.serinfo = nullhandler;
      this.nullservice = false;
    }
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
