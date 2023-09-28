<template>
    <transition name="modal-animation">
      <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="modal-inner">
            <i @click="close" class="far fa-times-circle"></i>
            <!-- Modal Content -->
            <h4>{{ this.modalTitle }}</h4>
            <hr />
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: ["modalActive", "modalTitle"],
    setup(props, { emit }) {
      const close = () => {
        emit("close");
      };
  
      return { close };
    },
  };
  </script>
  