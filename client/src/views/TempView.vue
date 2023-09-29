<template>
  <div class="hello">
    <h1>Available rooms list</h1>
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
// import APIModal from '@/components/APIs/APIModal.vue';
// import InputField from '@/components/APIs/InputField.vue';
// import DateInput from '@/components/APIs/DateInput.vue'

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
    this.info = await controller.getMTRooms();
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
    // APIModal,
    // InputField,
    // DateInput,
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
