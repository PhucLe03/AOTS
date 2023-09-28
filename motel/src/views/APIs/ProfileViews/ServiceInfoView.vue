<template>
  <div class="hello">
    <h1>Service Info</h1>
    <h4>
      This is the service info page. Every information about a specific service
      should be here.
    </h4>
    <h3 style="color: red">Service: {{ info.name }}</h3>
    <div>
      <table style="width: 100%">
        <tr>
          <th>Unit</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>
            {{ info.unit }}
          </td>
          <td>
            {{ info.price }}
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
  async created() {
    this.info = await controller.getServiceByID(this.$route.params.id);
    controller.setTitle("Service " + this.info.name);
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
