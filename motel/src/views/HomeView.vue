<template>
  <div class="hello">
    <h1>Home</h1>

    <h5>This is the home page. Default view should be here.</h5>
    <HelloWorld msg="Hello World"></HelloWorld>
    <HomeImage msg="Home Logo"></HomeImage>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import HomeImage from "@/components/HomeImage.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    HomeImage,
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
