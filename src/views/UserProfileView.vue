<template>
    <div class="hello">
      <h1>User Profile</h1>
      <h4>This is the user profile page. Every information about a specific user should be here.</h4>
      <h5 style="color: red;">Hello user {{ $route.params.id }}!!</h5>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeView",
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
  