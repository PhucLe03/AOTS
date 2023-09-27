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
            <InputField label="Type" placeholder="Type" v-model="this.roomData.type"/>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <InputField label="Price" type="number" placeholder="Price" v-model="this.roomData.price"/>
          </div>
          <div class="col-4">
            <InputField label="Date of hire" type="date" placeholder="Hire date" v-model="this.roomData.day_of_hire"/>
          </div>
          <div class="col-4">
            <InputField label="Expiration Date" type="date" placeholder="Expired date" v-model="this.roomData.expiration_date"/>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- <FakeServiceModal/> -->
        <h1>Hello</h1>
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
            <InputField label="Type" placeholder="Type" v-model="this.chosenRoom.type"/>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <InputField label="Price" type="number" placeholder="Price" v-model="this.chosenRoom.price"/>
          </div>
          <div class="col-4">
            <InputField label="Deposit" type="number" placeholder="Deposit" v-model="this.chosenRoom.deposit"/>
          </div>
          <div class="col-4">
            <InputField label="Status" placeholder="Status" v-model="this.chosenRoom.status"/>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <InputField label="Date of hire" type="date" placeholder="Hire date" v-model="this.chosenRoom.day_of_hire"/>
          </div>
          <div class="col-4">
            <InputField label="Expiration Date" type="date" placeholder="Expired date" v-model="this.chosenRoom.expiration_date"/>
          </div>
          <div class="col-4">
            <InputField label="Sort" type="number" placeholder="Sort" v-model="this.chosenRoom.sort"/>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Hello</h1>
      </div>
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
          <th>Status</th>
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
            {{ item.status }}
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
import { ref } from 'vue';
import controller from '@/utils/controller';
import APIModal from '@/components/APIs/APIModal.vue';
import InputField from '@/components/APIs/InputField.vue';

export default {
  name: "RoomView",
  data() {
    return {
      info: null,
      error: String,
      removing: Boolean,
      response: {},
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
    this.roomData.expiration_date = new Date(year+10,month,day);
    this.roomData.status = "available";
    this.roomData.services = [];
    this.roomData.sort = 0;
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
      this.chosenRoom.updated_at = Date.now();
      await controller.updateRoom(item._id, this.chosenRoom);
      window.location.reload();
    },
    async Delete(item) {
      console.log("remove", item._id);
      // await controller.deleteRoom(item._id);
      // this.toggleRemove("");
      // this.removing = true;
      // window.location.reload();
      // await controller.getServices();
    },
  },
  components: {
    APIModal,
    InputField,
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
