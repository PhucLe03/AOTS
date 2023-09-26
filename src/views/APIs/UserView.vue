<template>
  <div class="hello">
    <h1>Renters list</h1>
    <APIModal
      @close="toggleAdd"
      :modalTitle="addTitle"
      :modalActive="addActive"
    >
      <div style="" v-if="addActive">
        <div class="row">
          <div class="col-7">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="Name"
                v-model="this.renterData.name"
              />
              <label class="form-label">Name</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-5">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="Phone"
                v-model="this.renterData.phone"
              />
              <label class="form-label">Phone</label>
              <span class="text-danger"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="idcard"
                v-model="this.renterData.idcard"
              />
              <label class="form-label">ID Number</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-3">
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="this.renterData.sex"
              >
                <option selected>Choose</option>
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
              <label class="form-label">Gender</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                type="date"
                placeholder="Birthday"
                v-model="this.renterData.birthday"
              />
              <label class="form-label">Birthday</label>
              <span class="text-danger"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="Province"
                v-model="this.renterData.province"
              />
              <label class="form-label">Province</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="District"
                v-model="this.renterData.district"
              />
              <label class="form-label">District</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="Commune"
                v-model="this.renterData.commune"
              />
              <label class="form-label">Commune</label>
              <span class="text-danger"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="Address"
                v-model="this.renterData.address"
              />
              <label class="form-label">Address</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                placeholder="Room"
                v-model="this.renterData.room"
              />
              <label class="form-label">Room</label>
              <span class="text-danger"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <FakeUserModal/>
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
    <!-- <button @click="fetchData">Fetch</button> -->
    <APIModal
      @close="toggleEdit"
      :modalTitle="editTitle"
      :modalActive="editActive"
    >
    <div style="" v-if="editActive">
      <div class="row">
        <div class="col-7">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="Name"
              v-model="this.chosenRenter.name"
            />
            <label class="form-label">Name</label>
            <span class="text-danger"></span>
          </div>
        </div>
        <div class="col-5">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="Phone"
              v-model="this.chosenRenter.phone"
            />
            <label class="form-label">Phone</label>
            <span class="text-danger"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="idcard"
              v-model="this.chosenRenter.idcard"
            />
            <label class="form-label">ID Number</label>
            <span class="text-danger"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              v-model="this.chosenRenter.sex"
            >
              <option selected>Choose</option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
            <label class="form-label">Gender</label>
            <span class="text-danger"></span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              type="date"
              placeholder="Birthday"
              v-model="this.chosenRenter.birthday"
            />
            <label class="form-label">Birthday</label>
            <span class="text-danger"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="Province"
              v-model="this.chosenRenter.province"
            />
            <label class="form-label">Province</label>
            <span class="text-danger"></span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="District"
              v-model="this.chosenRenter.district"
            />
            <label class="form-label">District</label>
            <span class="text-danger"></span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="Commune"
              v-model="this.chosenRenter.commune"
            />
            <label class="form-label">Commune</label>
            <span class="text-danger"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="Address"
              v-model="this.chosenRenter.address"
            />
            <label class="form-label">Address</label>
            <span class="text-danger"></span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              placeholder="Room"
              v-model="this.chosenRenter.room"
            />
            <label class="form-label">Room</label>
            <span class="text-danger"></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <FakeUserModal/>
    </div>
    <hr />
      <button
        class="phuc_button"
        @click="Edit(this.chosenRenter)"
        type="button"
        style="width: 30%; background-color: green"
      >
        Update
      </button>
    </APIModal>

    <APIModal @close="toggleRemove" :modalActive="removeActive">
      <h1>Warning!</h1>
      <hr />
      <div v-if="chosenRenter">
        Are you sure to remove {{ chosenRenter.name }}?
      </div>
      <div v-else>Removing...</div>
      <hr />
      <button
        class="phuc_button"
        @click="Delete(chosenRenter)"
        type="button"
        style="width: 20%"
      >
        Remove
      </button>
    </APIModal>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Birthday</th>
          <th>Gender</th>
          <th>Province</th>
          <th>District</th>
          <th>Commune</th>
          <th>Room</th>
          <th>
            <button
              class="phuc_button phuc_add_button"
              @click="toggleAdd"
              type="button"
            >
              Add Renter
            </button>
          </th>
        </tr>
        <tr v-for="item in info" :key="item._id">
          <td>
            <a :href="'/api/renter/' + item._id">{{ item.name }}</a>
          </td>
          <td>
            {{ item.birthday_format }}
          </td>
          <td>
            {{ item.sex_f }}
          </td>
          <td>
            {{ item.province }}
          </td>
          <td>
            {{ item.district }}
          </td>
          <td>
            {{ item.commune }}
          </td>
          <td>
            {{ item.room }}
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
import FakeUserModal from "@/components/Fakes/FakeUserModal.vue"
import { ref } from "vue";

export default {
  name: "UserView",
  data() {
    return {
      info: null,
      error: String,
      response: {},
      renterData: {
        name: String,
        phone: String,
        idcard: String,
        birthday: Date,
        sex: Boolean,
        province: String,
        district: String,
        commune: String,
        address: String,
        room: String,
        main_contact: Boolean,
        status: String,
      },
    };
  },
  setup() {
    const addTitle = ref("Add a renter");
    const editTitle = ref("Edit renter");

    const addActive = ref(false);
    const toggleAdd = () => {
      addActive.value = !addActive.value;
    };
    const removeActive = ref(false);
    const chosenRenter = ref("");
    function toggleRemove(item) {
      chosenRenter.value = item;
      removeActive.value = !removeActive.value;
    }

    const editActive = ref(false);
    function toggleEdit(item) {
      chosenRenter.value = item;
      editActive.value = !editActive.value;
    }

    return {
      addTitle,
      editTitle,

      addActive,
      toggleAdd,

      removeActive,
      chosenRenter,
      toggleRemove,

      editActive,
      toggleEdit,
    };
  },
  async created() {
    this.renterData.name = "";
    this.renterData.idcard = "";
    this.renterData.phone = "";
    this.renterData.sex = false;
    this.renterData.birthday = Date.now();
    this.renterData.province = "";
    this.renterData.district = "";
    this.renterData.commune = "";
    this.renterData.address = "";
    this.renterData.room = "";
    this.info = await controller.getUsers();
  },

  methods: {
    async Create() {
      // this.chosenRenter.created_at = Date.now();
      // this.chosenRenter.updated_at = Date.now();
      await controller.createUser(this.renterData);
      window.location.reload();
    },
    async Edit(item) {
      this.chosenRenter.updated_at = Date.now();
      await controller.updateUser(item._id, this.chosenRenter);
      window.location.reload();
    },
    async Delete(item) {
      console.log("remove", item._id);
      await controller.deleteUser(item._id);
      this.toggleRemove("");
      window.location.reload();
    },
  },
  components: {
    APIModal,
    FakeUserModal,
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
a {
  color: red;
}
</style>
