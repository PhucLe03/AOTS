<template>
  <nav
    class="bg-sky-500 p-5 flex items-center gap-5 text-xl rounded-lg text-white font-bold"
  >
    <!-- <img src="../assets/duy.jpg" alt="Paris" px-5 py-2 leading-7>  -->

    <RouterLink
      class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-xl leading-7 rounded-md font-semibold text-white uppercase"
      to="/"
      >Home</RouterLink
    >
    <RouterLink
      class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-xl leading-5 rounded-full font-semibold text-white"
      to="/room"
      >Rooms</RouterLink
    >
    <RouterLink
      class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-xl leading-5 rounded-full font-semibold text-white"
      to="/renter"
      >Renters</RouterLink
    >
    <RouterLink
      class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-xl leading-5 rounded-full font-semibold text-white"
      to="/service"
      >Services</RouterLink
    >
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>
