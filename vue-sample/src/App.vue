<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{ title }}</h1>
  <HelloWorld msg="Welc  ome to Your Vue.js App"/>-->
  <div> 
    <p>{{ message }}</p>
    <button @click="updateMessage">Update Message</button>
    <!--two way-->
    <input  v-model="message"/>
    <!-- methods sample -->
    <div>
      <br/>
      <button @click="sayhello">Hello</button>
      <button @click="saybye">Bye</button>
    </div>
    <HelloWorld/>
  </div>
  <header>
        <router-link to="/">Home</router-link>
        | <router-link to="/about">About</router-link>
        | <router-link to="/directives">Directives</router-link>
    </header>
    <h1>DHBK</h1>
    <router-view />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      title:"hello",
    };
  },
  methods:{
    updateMessage(){
      this.message = "updating...";
    },
    sayhello(){
      alert("hello");
    },
    saybye(){
      alert("cook");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
