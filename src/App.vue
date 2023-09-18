<template>
  <html lang="en">
    <body>
      <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
      <!-- <HomeView></HomeView>
  <HelloWorld msg="Welcome to Your Vue.js App" /> -->
      <app-header></app-header>
      <router-view />
      <app-footer></app-footer>
    </body>
  </html>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif, Avenir;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

<style scoped></style>
