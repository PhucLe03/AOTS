<template>
  <html lang="en">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HomeView></HomeView>
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <header>
      <nav
        class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3 phuc_bg"
      >
        <div class="container-fluid">
          <img
            class="phuc_logo"
            alt="Phuc logo"
            src="../assets/images/phuclogo.png"
          />
          <a class="navbar-brand">GTAHOTEL</a>
          <div
            class="navbar-collapse collapse d-sm-inline-flex justify-content-between"
          >
            <ul class="navbar-nav flex-grow-1">
              <li class="phuc_nav">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="phuc_nav">
                <a class="nav-link" href="privacy">Privacy</a>
              </li>
              <li class="phuc_nav">
                <a class="nav-link" href="about">About</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="container-fluid"></div> -->
        <div
          class="navbar-collapse collapse d-sm-inline-flex justify-content-end"
        >
          <ul class="navbar-nav flex-grow-1">
            <li class="phuc_nav">
              <a class="nav-link" href="/api/renters">Renters</a>
            </li>
            <li class="phuc_nav">
              <a class="nav-link" href="/api/rooms">Rooms</a>
            </li>
            <li class="phuc_nav">
              <a class="nav-link" href="/api/services">Services</a>
            </li>
          </ul>
        </div>
        <div class="container-fluid"></div>
      </nav>
    </header>
  </html>
</template>

<script>
export default {
  name: "AppHeader",
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
