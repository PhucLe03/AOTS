<template>
  <div class="hello">
    <h1>Services list</h1>
    <!-- <button @click="fetchData">Fetch</button> -->
    <AddService @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content"></div>
    </AddService>
    <button class="phuc_button" @click="toggleModal" type="button">
      Add Service
    </button>
    <ServiceRemove @close="toggleRemove" :modalActive="removeActive">
      <h1>Remove this service?</h1>
    </ServiceRemove>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Unit</th>
          <th>Price</th>
        </tr>
        <tr v-for="item in info" :key="item._id">
          <td>
            <a :href="'/api/service/' + item._id">{{ item.name }}</a>
          </td>
          <td>
            {{ item.unit }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            <button @click="toggleRemove" class="phuc_delete_button">
              <span class="material-symbols-outlined"> edit </span>
            </button>

            <button style="visibility: hidden"></button>
            <button @click="toggleRemove" class="phuc_delete_button">
              <!-- <i class="fa fa-trash"></i> -->
              <span class="material-symbols-outlined"> delete_forever </span>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import controller from "@/utils/controller";
import AddService from "@/components/APIs/Add/AddService.vue";
import ServiceRemove from "@/components/APIs/Alert/ServiceRemove";
import { ref } from "vue";

export default {
  name: "ServiceView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
    };
  },
  setup() {
    const modalActive = ref(false);
    const removeActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    const toggleRemove = () => {
      removeActive.value = !removeActive.value;
    };
    return { modalActive, toggleModal, removeActive, toggleRemove };
  },
  async created() {
    this.info = await controller.getServices();
  },

  methods: {},
  components: {
    AddService,
    ServiceRemove,
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
  display: block;
  margin: 0 10px;
}
</style>
