<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <i @click="close" class="far fa-times-circle"></i>
          <!-- Modal Content -->
          <slot />
          <div class="col">
            <button
              class="phuc_button"
              @click="close"
              type="button"
              style="width: 20%; background-color: green"
            >
              Cancel
            </button>
            <button style="width: 10%; visibility: hidden"></button>
            <button
              class="phuc_button"
              @click="remove"
              type="button"
              style="width: 20%"
            >
              Remove
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
// import controller from "@/utils/controller";

export default {
  props: ["modalActive",],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    // async function remove(removeID) {
    //   console.log(removeID);
    //   await controller.deleteService(removeID);
    // }

    return { close, };
  },
};
</script>
