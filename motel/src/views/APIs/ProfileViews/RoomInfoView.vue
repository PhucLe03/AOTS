<template>
  <div class="hello">
    <h1>Room Info</h1>
    <h4>
      This is the room info page. Every information about a specific room should
      be here.
    </h4>
    <h3 style="color: red">Room: {{ info.name }}</h3>
    <APIModal
      @close="toggleAdd"
      :modalTitle="addTitle"
      :modalActive="addActive"
    >
      <div style="" v-if="addActive">
        <div class="row">
          <div class="col-6">
            <div class="form-floating mb-3">
              <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="this.serviceData.serviceId"
                >
                  <option v-for="item in serviceOpt" :key="item" :value="item._id"> {{ item.name }} ({{ item.price }}/{{ item.unit }})</option>
                </select>
              <label class="form-label">Service</label>
              <span class="text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <InputField label="Quantity" type="number" placeholder="Quanity" v-model="this.serviceData.quantity"/>
          </div>
        </div>
      </div>
      <hr/>
      <button
        class="phuc_button"
        @click="Add(this.serviceData)"
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
      <div style="padding-bottom: 20px;">
        <h3>{{ this.chosenService.name }}</h3>
      </div>
      <div class="row">
        <div class="col-3">
        </div>
        <div class="col-6">
          <InputField label="Quantity" type="number" placeholder="Quanity" v-model="this.chosenService.quantity"/>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Bye</h2>
    </div>
    <hr/>
    <button
      class="phuc_button"
      @click="Edit(this.chosenService,this.chosenService.index)"
      type="button"
      style="width: 30%; background-color: green"
    >
      Update
    </button>
    </APIModal>
    <APIModal 
      @close="toggleRemove"
      :modalActive="removeActive"
    >
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
      @click="Delete(chosenService,chosenService.index)"
      type="button"
      style="width: 20%;"
    >
      Remove
    </button>
    </APIModal>
    <div>
      <table style="margin: auto;">
        <tr>
          <th>Group</th>
          <th>Type</th>
          <th>Price</th>
          <th>Deposit</th>
          <th>Debt</th>
          <th>Renter</th>
          <th>Status</th>
          <th>Date of hire</th>
          <th>Expiration date</th>
        </tr>
        <tr>
          <td>{{ info.group }}</td>
          <td>{{ info.type }}</td>
          <td>{{ info.price }}</td>
          <td>{{ info.deposit }}</td>
          <td>{{ info.debt }}</td>
          <td>{{ info.renter }} / {{ info.capacity }}</td>
          <td>{{ info.status }}</td>
          <td>{{ info.day_of_hire_format }}</td>
          <td>{{ info.expiration_date_format }}</td>
        </tr>
      </table>
      <h3>Services List</h3>
      <!-- <h4>{{ serinfo }}</h4> -->
      <div v-if="nullservice">
        <h3>No service found.</h3>
      </div>
      <div v-else>
        <table style="margin: auto; width: 40%;">
          <tr>
            <th>Service's name</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Quantity</th>
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
          <tr v-for="(item, idx) in serinfo" :key="idx">
            <td>{{ item.name }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.price }}</td>
            <td>{{ info.services[idx].quantity }}</td>
            <td>
              <button
                @click="toggleEdit(item,idx,info.services[idx].quantity)"
                class="phuc_button phuc_edit_button phuc_button_icon"
              >
                <span class="material-symbols-outlined"> edit </span>
              </button>
              <button style="visibility: hidden"></button>
              <button
                @click="toggleRemove(item,idx)"
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
  </div>
</template>

<script>
import { ref } from 'vue';
import controller from "@/utils/controller";
import APIModal from "@/components/APIs/APIModal.vue";
import InputField from '@/components/APIs/InputField.vue';
// const nullhandler = {
//   name : 0,
//   unit : 0,
//   price : 0,
// }

export default {
  name: "UserProfileView",
  data() {
    return {
      info: [],
      serinfo: [],
      serviceOpt: [],
      serviceData: {
        serviceId: null,
        quantity: Number,
      },
      error: String,
      removing: Boolean,
      response: {},
      response1: {},
      nullservice: Boolean,
    };
  },
  setup() {
    const addTitle = ref("Add a service to room");
    const editTitle = ref("Edit service's quantity");

    const addActive = ref(false);
    const toggleAdd = () => {
      addActive.value = !addActive.value;
    };
    const removeActive = ref(false);
    const chosenService = ref("");
    function toggleRemove(item,idx) {
      if (item) {
        item.index = idx;
      }
      chosenService.value = item;
      removeActive.value = !removeActive.value;
    }

    const editActive = ref(false);
    function toggleEdit(item,idx,q) {
      if (item) {
        item.index = idx;
        item.quantity = q;
      }
      chosenService.value = item;
      // chosenService.value.index = idx;
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
    this.nullservice = true;
    this.serviceData.quantity = 0;
    // this.serinfo = nullhandler;
    var roomid = this.$route.params.id;
    this.info = await controller.getRoomByID(roomid);
    controller.setTitle("Room " + this.info.name);
    this.serinfo = await controller.getRoomServices(roomid);
    this.serviceOpt = await controller.getServices();
    // console.log(this.info.services)
    if (this.serinfo !== null) {
      // this.serinfo = nullhandler;
      this.nullservice = false;
    }
  },
  methods: {
    async Add(item) {
      var src = this.info.services;
      src = src.concat(item);
      // console.log(src);
      this.info.services = src;
      await controller.updateRoom(this.info._id,this.info);
      window.location.reload();
    },
    async Edit(item,idx) {
      // console.log(item);
      var src = this.info.services.slice();
      var tmp = src[idx];
      tmp.quantity = item.quantity;
      src[idx] = tmp;
      // console.log(src);
      this.info.services = src;
      await controller.updateRoom(this.info._id,this.info);
      window.location.reload();
    },
    async Delete(item,idx) {
      // console.log(idx,item);
      var src = this.info;
      var ser = src.services.slice();
      ser.splice(idx,1);
      // console.log(ser);
      var data = Object.assign({}, src);
      data.services = ser;
      await controller.updateRoom(this.info._id,data);
      window.location.reload();
      //Bug here
      // this.info.services = src;


    }
  },
  components: {
    APIModal,
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table,
th,
td {
  align-tracks: center;
  border: 1px solid black;
}

table {
  margin: 40px 0 0;
}
</style>