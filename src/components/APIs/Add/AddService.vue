<template>
    <transition name="modal-animation">
      <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="modal-inner">
            <i @click="close" class="far fa-times-circle"></i>
            <!-- Modal Content -->
            <h4>Add a service</h4>
            <hr />
            <div style="">
                <div class="form-floating mb-3">
                    <input class="form-control" placeholder="Name" />
                    <label class="form-label">Name</label>
                    <span class="text-danger"></span>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" placeholder="Unit" />
                    <label class="form-label">Unit</label>
                    <span class="text-danger"></span>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" placeholder="Price" />
                    <label class="form-label">Price</label>
                    <span class="text-danger"></span>
                </div>
            </div>
            <div class="phuc_align">
                <button class="phuc_button" @click="close" type="button" style="width: 30%; text-align: center;">Cancel</button>
                <button style="width: 10%; visibility: hidden;"></button>
                <button class="phuc_button" @click="close" type="button" style="width: 30%; background-color: green;">Add</button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: ["modalActive"],
    setup(props, { emit }) {
      const close = () => {
        emit("close");
      };
  
      return { close };
    },
  };
  </script>
  