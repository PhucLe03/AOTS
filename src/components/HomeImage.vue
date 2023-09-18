<template>
  <div class="hello">
    <!-- <div> -->
      <ul>
        <li>
          <img alt="Phuc logo" src="../assets/images/phuclogo.png" style="width: 100%; height: 100px; border-radius: 50%;"/>
        </li>
        <li>
          <h1>{{ msg }}</h1>
        </li>
      </ul>
    <!-- </div> -->
  </div>
</template>

<script>
// import image from "../assets/images/AVT.PNG"

export default {
  name: "HomeImage",
  props: {
    msg: String,
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
</style>
