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
            <InputField label="Name" placeholder="Name" v-model="this.renterData.name"/>
          </div>
          <div class="col-5">
            <InputField label="Phone" placeholder="Phone" v-model="this.renterData.phone"/>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <InputField label="ID Number" placeholder="ID" v-model="this.renterData.idcard"/>
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
            <InputField label="Birthday (mm/dd/yyyy)" type="date" placeholder="Date" v-model="this.renterData.birthday"/>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <InputField label="Province" placeholder="Province" v-model="this.renterData.province"/>
          </div>
          <div class="col-4">
            <InputField label="District" placeholder="District" v-model="this.renterData.district"/>
          </div>
          <div class="col-4">
            <InputField label="Commune" placeholder="Commune" v-model="this.renterData.commune"/>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <InputField label="Address" placeholder="Address" v-model="this.renterData.address"/>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="this.renterData.room_input"
                >
                  <option v-for="item in availRooms" :key="item" :value="item"> {{ item.name }}</option>
                </select>
              <label class="form-label">Room</label>
              <span class="text-danger"></span>
            </div>
            <!-- <InputField label="Room" placeholder="Room" v-model="this.renterData.room.name"/> -->
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
          <InputField label="Name" placeholder="Name" v-model="this.chosenRenter.name"/>
        </div>
        <div class="col-5">
          <InputField label="Phone" placeholder="Phone" v-model="this.chosenRenter.phone"/>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <InputField label="ID Number" placeholder="ID" v-model="this.chosenRenter.idcard"/>
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
          <!-- <div>
            <div class="form-floating mb-3">
              <input class="form-control" type="date" data-date-format="DD/MM/YYYY" placeholder="Birthday" v-model="this.chosenRenter.birthday_format_input"/>
              <label class="form-label">Birthday</label>
            </div>
          </div> -->
          <DateInput label="Birthday (mm/dd/yyyy)" dateformat="DD/MM/YYYY" placeholder="Birthday" v-model="this.chosenRenter.birthday_format_input"/>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <InputField label="Province" placeholder="Province" v-model="this.chosenRenter.province"/>
        </div>
        <div class="col-4">
          <InputField label="District" placeholder="District" v-model="this.chosenRenter.district"/>
        </div>
        <div class="col-4">
          <InputField label="Commune" placeholder="Commune" v-model="this.chosenRenter.commune"/>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <InputField label="Address" placeholder="Address" v-model="this.chosenRenter.address"/>
        </div>
        <div class="col-4">
          <div class="form-floating mb-3">
            <select
                class="form-select"
                id="floatingSelect"
                v-model="this.chosenRenter.room_input"
              >
                <option v-for="item in availRooms" :key="item" :value="item"> {{ item.name }}</option>
              </select>
            <label class="form-label">Room (current: {{ chosenRenter.room.name }})</label>
            <span class="text-danger"></span>
          </div>
          <!-- <InputField label="Room" placeholder="Room" v-model="this.chosenRenter.room.name"/> -->
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
      <div v-else-if="removing">Removing...</div>
      <div v-else>Canceling...</div>
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
    <!-- <div>
      <h6>{{this.availRooms}}</h6>
    </div> -->
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Birthday</th>
          <th>Gender</th>
          <th>Province</th>
          <th>District</th>
          <th>Address</th>
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
            {{ item.address }}
          </td>
          <td>
            {{ item.room.name }}
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
import InputField from "@/components/APIs/InputField.vue";
import DateInput from "@/components/APIs/DateInput.vue";

import FakeUserModal from "@/components/Fakes/FakeUserModal.vue";
import { ref } from "vue";
// import moment from "moment";

export default {
  name: "UserView",
  data() {
    return {
      info: null,
      error: String,
      removing: Boolean,
      response: {},
      availRooms: [],
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
        room: {
          roomId: String,
          name: String,
        },
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
    const chosenRenter = ref(null);
    function toggleRemove(item) {
      chosenRenter.value = item;
      removeActive.value = !removeActive.value;
    }

    const editActive = ref(false);
    function toggleEdit(item) {
      chosenRenter.value = item;
      // if (item!==null) {
      //   if (item.room!==null) {
      //     chosenRenter.value.room_input = item.room;
      //     chosenRenter.value.room_input.name = item.room.name;
      //   }
      // }
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
    // this.renterData.room.name = "";
    this.removing = false;

    this.availRooms = await controller.getMTRooms();
    this.info = await controller.getUsers();

    // update room name
    for (var item in this.info) {
      // console.log(item,this.info[item])
      var userID = this.info[item]._id;
      var tmp = await controller.getRoomByID(this.info[item].room.roomId);
      var newData = this.info[item];
      newData.room.name = tmp.name;
      await controller.updateUser(userID, newData);
    }
    this.info = await controller.getUsers();
  },

  methods: {
    async Create() {
      // this.chosenRenter.created_at = Date.now();
      // this.chosenRenter.updated_at = Date.now();
      if (this.renterData.room_input!==null) {
        // console.log('Không NULL');
        // console.log(this.renterData.room);
        this.renterData.room.roomId = this.renterData.room_input._id;
        this.renterData.room.name = this.renterData.room_input.name;
        await controller.addRenterToRoom(this.renterData.room_input._id, 1);
      }
      // console.log("Creating...")
      await controller.createUser(this.renterData);
      const updatedRoom = await controller.getRoomByID(this.renterData.room.roomId);
      // console.log(updatedRoom.status);
      await controller.updateRoom(this.renterData.room.roomId, updatedRoom);
      window.location.reload();
    },
    async Edit(item) {
      item.birthday = item.birthday_format_input;
      item.updated_at = Date.now();
      // console.log(item.room_input._id);
      if (item.room_input!==null) {
        //Add and subtract
        if (item.room!==null) {
          await controller.addRenterToRoom(item.room.roomId, -1);
        }
        item.room = item.room_input;
        item.room.roomId = item.room_input._id;
        await controller.addRenterToRoom(item.room_input._id, 1);
      }
      await controller.updateUser(item._id, item);
      const updatedRoom = await controller.getRoomByID(item.room.roomId);
      // console.log(updatedRoom.status);
      await controller.updateRoom(item.room.roomId, updatedRoom);
      window.location.reload();
    },
    async Delete(item) {
      // console.log("remove", item._id);
      // await controller.addRenterToRoom(item.room.roomId, -1);
      await controller.deleteUser(item._id);
      this.toggleRemove("");
      this.removing = true;
      window.location.reload();
    },
  },
  components: {
    APIModal,
    FakeUserModal,
    InputField,
    DateInput,
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