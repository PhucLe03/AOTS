<template>
  <div class="hello">
    <h1>Services list</h1>
    <!-- <button @click="fetchData">Fetch</button> -->
    <!-- <AddService @close="toggleAdd" :modalActive="modalActive">
      <div class="modal-content"></div>
    </AddService> -->
    <RegisterModal
      @close="toggleAdd"
      :modalTitle="addTitle"
      :modalActive="addActive"
    >
      <div style="">
        <div class="form-floating mb-3">
          <input class="form-control" placeholder="Name" v-model="this.serviceData.name"/>
          <label class="form-label">Name</label>
          <span class="text-danger"></span>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" placeholder="Unit" v-model="this.serviceData.unit"/>
          <label class="form-label">Unit</label>
          <span class="text-danger"></span>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" placeholder="Price" v-model="this.serviceData.price"/>
          <label class="form-label">Price</label>
          <span class="text-danger"></span>
        </div>
      </div>
      <hr/>
      <button
        class="phuc_button"
        @click="Create"
        type="button"
        style="width: 30%; background-color: green"
      >
        Add
      </button>
    </RegisterModal>
    <ServiceRemove @close="toggleRemove" :modalActive="removeActive">
      <h1>Warning!</h1>
      <hr />
      <div v-if="chosenService">
        Are you sure to remove {{ chosenService.name }}?
      </div>
      <div v-else>Removing...</div>
      <hr />
      <button
        class="phuc_button"
        @click="Delete(chosenService)"
        type="button"
        style="width: 20%"
      >
        Remove
      </button>
    </ServiceRemove>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Unit</th>
          <th>Price</th>
          <th>
            <button
              class="phuc_button phuc_add_button"
              @click="toggleAdd"
              type="button"
            >
              Add Service
            </button>
          </th>
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
            <button
              class="phuc_button phuc_edit_button phuc_button_icon"
            >
              <span class="material-symbols-outlined"> edit </span>
            </button>
            <button style="visibility: hidden"></button>
            <button
              @click="toggleRemove(item)"
              class="phuc_button phuc_delete_button phuc_button_icon"
            >
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
import RegisterModal from "@/components/APIs/RegisterModal.vue";
import { ref } from "vue";

// import { api } from "@/utils/axios";
export default {
  name: "ServiceView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
      serviceData: {
        name: String,
        unit: String,
        price: Number,
      },
    };
  },

  setup() {
    const addTitle = ref("Add a service");

    const addActive = ref(false);
    const toggleAdd = () => {
      addActive.value = !addActive.value;
    };
    const removeActive = ref(false);
    const chosenService = ref("");
    // const toggleRemove = (id) => {
    // };

    function toggleRemove(item) {
      chosenService.value = item;

      removeActive.value = !removeActive.value;
    }

    return {
      addTitle,

      addActive,
      toggleAdd,

      removeActive,
      toggleRemove,

      chosenService,
    };
  },
  async created() {
    this.serviceData.name = "";
    this.serviceData.unit = "";
    this.serviceData.price = 0;
    this.info = await controller.getServices();
  },

  methods: {
    async Create() {
      await controller.createService(this.serviceData);
      window.location.reload();
    },
    async Delete(item) {
      console.log("remove", item._id);
      await controller.deleteService(item._id);
      this.toggleRemove("");
      window.location.reload();
      // await controller.getServices();
    },
  },
  components: {
    AddService,
    ServiceRemove,
    RegisterModal,
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
