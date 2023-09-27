<template>
  <div class="hello">
    <h1>Rooms list</h1>
    <APIModal
      @close="toggleAdd"
      :modalTitle="addTitle"
      :modalActive="addActive">
      <div style="" v-if="addActive">
        <div class="row">
          <div class="col-4">
            <InputField label="Name" placeholder="Name" v-model="this.roomData.name"/>
          </div>
          <div class="col-4">
            <InputField label="Group" placeholder="Group" v-model="this.roomData.group"/>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="this.roomData.type"
                >
                  <option v-for="item in typeOpt" :key="item" :value="item"> {{ item }}</option>
                </select>
              <label class="form-label">Type</label>
              <span class="text-danger"></span>
            </div>
            <!-- <InputField label="Type" placeholder="Type" v-model="this.roomData.type"/> -->
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <InputField label="Price" type="number" placeholder="Price" v-model="this.roomData.price"/>
          </div>
          <div class="col-4">
            <DateInput label="Date of hire (mm/dd/yyyy)" dateformat="DD/MM/YYYY" placeholder="Hire date" v-model="this.roomData.day_of_hire"/>
            <!-- <InputField label="Date of hire" type="date" placeholder="Hire date" v-model="this.roomData.day_of_hire"/> -->
          </div>
          <div class="col-4">
            <DateInput label="Expire Date (mm/dd/yyyy)" dateformat="DD/MM/YYYY" placeholder="Expired date" v-model="this.roomData.expiration_date"/>
            <!-- <InputField label="Expiration Date" type="date" placeholder="Expired date" v-model="this.roomData.expiration_date"/> -->
          </div>
        </div>
      </div>
      <div v-else>
        <FakeAddRoomModal/>
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
        <div class="row">
          <div class="col-4">
            <InputField label="Name" placeholder="Name" v-model="this.chosenRoom.name"/>
          </div>
          <div class="col-4">
            <InputField label="Group" placeholder="Group" v-model="this.chosenRoom.group"/>
          </div>
          <div class="col-4">
            <div class="form-floating mb-3">
              <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="this.chosenRoom.type"
                >
                  <option v-for="item in typeOpt" :key="item" :value="item"> {{ item }}</option>
                </select>
              <label class="form-label">Type</label>
              <span class="text-danger"></span>
            </div>
            <!-- <InputField label="Type" placeholder="Type" v-model="this.chosenRoom.type"/> -->
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <InputField label="Price" type="number" placeholder="Price" v-model="this.chosenRoom.price"/>
          </div>
          <div class="col-6">
            <InputField label="Deposit" type="number" placeholder="Deposit" v-model="this.chosenRoom.deposit"/>
          </div>
          <!-- <div class="col-4">
            <InputField label="Renter" type="number" placeholder="Renter" v-model="this.chosenRoom.renter"/>
          </div> -->
        </div>
        <div class="row">
          <div class="col-6">
            <DateInput label="Date of hire (mm/dd/yyyy)" dateformat="DD/MM/YYYY" placeholder="Hire date" v-model="this.chosenRoom.day_of_hire_format_input"/>
            <!-- <InputField label="Date of hire" type="date" placeholder="Hire date" v-model="this.chosenRoom.day_of_hire"/> -->
          </div>
          <div class="col-6">
            <DateInput label="Expire Date (mm/dd/yyyy)" dateformat="DD/MM/YYYY" placeholder="Expired date" v-model="this.chosenRoom.expiration_date_format_input"/>
            <!-- <InputField label="Expiration Date" type="date" placeholder="Expired date" v-model="this.chosenRoom.expiration_date"/> -->
          </div>
          <!-- <div class="col-4">
            <InputField label="Sort" type="number" placeholder="Sort" v-model="this.chosenRoom.sort"/>
          </div> -->
        </div>
      </div>
      <div v-else>
        <FakeEditRoomModal/>
      </div>
      <hr/>
      <button
        class="phuc_button"
        @click="Edit(this.chosenRoom)"
        type="button"
        style="width: 30%; background-color: green"
      >
        Update
      </button>
    </APIModal>
    <APIModal @close="toggleRemove" :modalActive="removeActive">
      <h1>Warning!</h1>
      <hr />
      <div v-if="chosenRoom">
        Are you sure to remove {{ chosenRoom.name }}?
      </div>
      <div v-else-if="removing">Removing...</div>
      <div v-else>Canceling...</div>
      <hr />
      <button
        class="phuc_button"
        @click="Delete(chosenRoom)"
        type="button"
        style="width: 20%;"
      >
        Remove
      </button>
    </APIModal>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Group</th>
          <th>Type</th>
          <th>Price</th>
          <th>Deposit</th>
          <th>Debt</th>
          <th>Renters</th>
          <th>Status</th>
          <th>Date of hire</th>
          <th>Expiration date</th>
          <!-- <th>Sort</th> -->
          <th>
            <button
              class="phuc_button phuc_add_button"
              @click="toggleAdd"
              type="button"
            >
              Add Room
            </button>
          </th>
        </tr>
        <tr v-for="item in info" :key="item._id">
          <td>
            <a :href="'/api/room/' + item._id">{{ item.name }}</a>
          </td>
          <td>
            {{ item.group }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            {{ item.deposit }}
          </td>
          <td>
            {{ item.debt }}
          </td>
          <td>
            {{ item.renter }} / {{ item.capacity }}
          </td>
          <td>
            {{ item.status }}
          </td>
          <td>
            {{ item.day_of_hire_format }}
          </td>
          <td>
            {{ item.expiration_date_format }}
          </td>
          <!-- <td>
            {{ item.sort }}
          </td> -->
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
import { ref } from 'vue';
import controller from '@/utils/controller';
import APIModal from '@/components/APIs/APIModal.vue';
import InputField from '@/components/APIs/InputField.vue';
import DateInput from '@/components/APIs/DateInput.vue';
import FakeEditRoomModal from '@/components/Fakes/FakeEditRoomModal.vue';
import FakeAddRoomModal from '@/components/Fakes/FakeAddRoomModal.vue';

export default {
  name: "RoomView",
  data() {
    return {
      info: null,
      error: String,
      removing: Boolean,
      response: {},
      typeOpt: [
        'small', 'medium', 'large'
      ],
      roomData: {
        name: String,
        group: String,
        type: String,
        price: Number,
        deposit: Number,
        debt: Number,
        renter: Number,
        day_of_hire: Date,
        expiration_date: Date,
        status: String,
        services: [],
        sort: Number,
      },
    };
  },
  // computed: {
  //   orderedRoom: function () {
  //     return _.orderBy(this.info, 'sort')
  //   }
  // },

  setup() {
    const addTitle = ref("Add a room");
    const editTitle = ref("Edit room");

    const addActive = ref(false);
    const toggleAdd = () => {
      addActive.value = !addActive.value;
    };
    const removeActive = ref(false);
    const chosenRoom = ref("");
    function toggleRemove(item) {
      chosenRoom.value = item;
      removeActive.value = !removeActive.value;
    }

    const editActive = ref(false);
    function toggleEdit(item) {
      chosenRoom.value = item;
      editActive.value = !editActive.value;
    }

    return {
      addTitle,
      editTitle,

      addActive,
      toggleAdd,

      removeActive,
      chosenRoom,
      toggleRemove,

      editActive,
      toggleEdit,
    };
  },
  async created() {
    this.roomData.name = "";
    this.roomData.group = "";
    this.roomData.type = "";
    this.roomData.price = 0;
    this.roomData.deposit = 0;
    this.roomData.day_of_hire = Date.now();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.roomData.expiration_date = new Date(year+2,month,day);
    this.roomData.status = "available";
    this.roomData.services = [];
    this.roomData.sort = 0;
    this.roomData.renter = 0;
    this.removing = false;
    this.info = await controller.getRooms();
  },

  methods: {
    async Create() {
      this.roomData.debt = this.roomData.price;
      await controller.createRoom(this.roomData);
      window.location.reload();
    },
    async Edit(item) {
      this.chosenRoom.day_of_hire = this.chosenRoom.day_of_hire_format_input;
      this.chosenRoom.expiration_date = this.chosenRoom.expiration_date_format_input;
      this.chosenRoom.debt = this.chosenRoom.price - this.chosenRoom.deposit;
      this.chosenRoom.updated_at = Date.now();
      await controller.updateRoom(item._id, this.chosenRoom);
      window.location.reload();
    },
    async Delete(item) {
      // console.log("remove", item._id);
      await controller.deleteRoom(item._id);
      this.toggleRemove("");
      this.removing = true;
      window.location.reload();
      // await controller.getServices();
    },
  },
  components: {
    APIModal,
    InputField,
    DateInput,
    FakeAddRoomModal,
    FakeEditRoomModal,
  }
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
