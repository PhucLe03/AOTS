<template>
  <div class="hello">
    <h1>Services list</h1>
    <APIModal
      @close="toggleAdd"
      :modalTitle="addTitle"
      :modalActive="addActive"
    >
      <div style="" v-if="addActive">
        <InputField label="Name" placeholder="Name" v-model="this.serviceData.name"/>
        <div class="form-floating mb-3">
          <select
              class="form-select"
              id="floatingSelect"
              v-model="this.serviceData.unit"
            >
              <option v-for="item in unitOpt" :key="item" :value="item"> {{ item }}</option>
            </select>
          <label class="form-label">Unit</label>
          <span class="text-danger"></span>
        </div>
        <InputField label="Price" type="number" placeholder="Price" v-model="this.serviceData.price"/>
      </div>
      <div v-else>
        <FakeServiceModal/>
      </div>
      <hr />
      <button
        class="phuc_button"
        @click="Create"
        type="button"
        style="width: 30%; background-color: green"
      >
        Add
      </button>
    </APIModal>

    <APIModal
      @close="toggleEdit"
      :modalTitle="editTitle"
      :modalActive="editActive"
    >
      <div style="" v-if="editActive">
        <InputField label="Name" placeholder="Unit" v-model="this.chosenService.name"/>
        <div class="form-floating mb-3">
          <select
              class="form-select"
              id="floatingSelect"
              v-model="this.chosenService.unit"
            >
              <option v-for="item in unitOpt" :key="item" :value="item"> {{ item }}</option>
            </select>
          <label class="form-label">Unit</label>
          <span class="text-danger"></span>
        </div>
        <InputField label="Price" type="number" placeholder="Price" v-model="this.chosenService.price"/>
      </div>
      <div v-else>
        <FakeServiceModal/>
      </div>
      <hr />
      <button
        class="phuc_button"
        @click="Edit(this.chosenService)"
        type="button"
        style="width: 30%; background-color: green"
      >
        Update
      </button>
    </APIModal>
    <APIModal @close="toggleRemove" :modalActive="removeActive">
      <h1>Warning!</h1>
      <hr />
      <div v-if="chosenService">
        Are you sure to remove {{ chosenService.name }}?
      </div>
      <div v-else-if="removing">Removing...</div>
      <div v-else>Canceling...</div>
      <hr />
      <button
        class="phuc_button"
        @click="Delete(chosenService)"
        type="button"
        style="width: 20%;"
      >
        Remove
      </button>
    </APIModal>
    <div>
      <table style="width: 50%">
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
              @click="toggleEdit(item)"
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
import APIModal from "@/components/APIs/APIModal.vue";
import InputField from "@/components/APIs/InputField.vue"
import FakeServiceModal from "@/components/Fakes/FakeServiceModal.vue";
import { ref } from "vue";

export default {
  name: "ServiceView",
  data() {
    return {
      info: null,
      error: String,
      removing: Boolean,
      response: {},
      unitOpt: [
        'Kg','10m2','L','Xe','Phòng','KWh'
      ],
      serviceData: {
        name: String,
        unit: String,
        price: Number,
      },
    };
  },

  setup() {
    const addTitle = ref("Add a service");
    const editTitle = ref("Edit service");

    const addActive = ref(false);
    const toggleAdd = () => {
      addActive.value = !addActive.value;
    };
    const removeActive = ref(false);
    const chosenService = ref("");
    function toggleRemove(item) {
      chosenService.value = item;
      removeActive.value = !removeActive.value;
    }

    const editActive = ref(false);
    function toggleEdit(item) {
      chosenService.value = item;
      editActive.value = !editActive.value;
    }

    return {
      addTitle,
      editTitle,

      addActive,
      toggleAdd,

      removeActive,
      chosenService,
      toggleRemove,

      editActive,
      toggleEdit,
    };
  },
  async created() {
    this.serviceData.name = "";
    this.serviceData.unit = "";
    this.serviceData.price = 0;
    this.removing = false;
    this.info = await controller.getServices();
  },

  methods: {
    async Create() {
      await controller.createService(this.serviceData);
      window.location.reload();
    },
    async Edit(item) {
      this.chosenService.updated_at = Date.now();
      await controller.updateService(item._id, this.chosenService);
      window.location.reload();
    },
    async Delete(item) {
      // console.log("remove", item._id);
      await controller.deleteService(item._id);
      this.toggleRemove("");
      this.removing = true;
      window.location.reload();
      // await controller.getServices();
    },
  },
  components: {
    // AddService,
    APIModal,
    FakeServiceModal,
    InputField,
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
