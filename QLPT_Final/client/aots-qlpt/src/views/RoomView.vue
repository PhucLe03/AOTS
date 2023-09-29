<script setup>
import Inputa from "../components/InputField.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center my-5">
      <h1
        class="py-2 px-3 bg-sky-100 text-stone-950 text-sm font-semibold rounded-full shadow focus:outline-none"
      >
        Rooms List
      </h1>
      <button
        class="px-5 p-1.5 rounded-full hover:bg-sky-100 font-bold text-stone-950 shadow focus:outline-none"
        type="button"
        @click="Create"
      >
        Add Room
      </button>
    </div>
    <div class="relative mt-5 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">No.</th>
            <th scope="col" class="px-6 py-3">Room name</th>
            <th scope="col" class="px-6 py-3">State</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Contract information</th>
            <th scope="col" class="px-6 py-3">Service</th>
            <th scope="col" class="px-6 py-3">Note</th>
            <th scope="col" class="w-60"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in rooms"
            :key="index"
            class="bg-white border-b"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ index + 1 }}
            </th>
            <td>
              <p>{{ item.name }}</p>
              <p>{{ item.group }}</p>
            </td>

            <td>
              <p>{{ item.type }}</p>
            </td>

            <td>
              <p>Price: {{ item.price_f }}</p>
              <p>Deposit: {{ item.deposit_f }}</p>
              <p>Debt: {{ item.debt_f }}</p>
            </td>

            <td>
              <p>Number of Renters: {{ item.numberOfRenters }}</p>
              <p>
                Day of Hire: {{ item.day_of_hire_f }} -
                {{ item.expiration_date_f }}
              </p>
            </td>

            <td>
              {{ item.services?.map((s) => s.name).join(", ") }}
            </td>

            <td>
              {{ item.description }}
            </td>

            <td class="flex justify-center gap-2 px-6 py-4">
              <button
                @click="Update(item)"
                class="px-4 py-1 font-bold text-white rounded bg-cyan-700"
              >
                Edit
              </button>
              <button
                @click="Delete(item._id)"
                class="px-4 py-1 font-bold text-white bg-red-800 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      id="roomModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="bg-sky-600 flex items-start justify-between p-4 border-b rounded-t"
          >
            <h3 class="text-xl font-semibold text-white">
              {{ roomModal.txtTitle }}
            </h3>
          </div>
          <!-- Modal body -->
          <div class="grid grid-cols-12 gap-3 p-6">
            <div class="col-span-12 shadow p-2">
              <Inputa
                label="Room Name"
                type="text"
                placeholder="Enter room name"
                v-model="roomModal.dataRoom.name"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-6 shadow p-2">
              <Inputa
                label="Group"
                type="text"
                placeholder="Floor 1, Floor 2, Floor 3,..."
                v-model="roomModal.dataRoom.group"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-6 shadow p-2">
              <Inputa
                label="Type of Room"
                type="text"
                placeholder="Rented, Empty, or being Repaied,..."
                v-model="roomModal.dataRoom.type"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-4 shadow p-2">
              <Inputa
                label="Price"
                type="number"
                placeholder="Enter price"
                v-model="roomModal.dataRoom.price"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-4 shadow p-2">
              <Inputa
                label="Deposit"
                type="number"
                placeholder="Enter deposit"
                v-model="roomModal.dataRoom.deposit"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-4 shadow p-2">
              <Inputa
                label="Debt"
                type="number"
                placeholder="Enter debt"
                v-model="roomModal.dataRoom.debt"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-6 shadow p-2">
              <Inputa
                label="Date of Hire"
                type="date"
                v-model="roomModal.dataRoom.day_of_hire"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-6 shadow p-2">
              <Inputa
                label="Expiration Date"
                type="date"
                v-model="roomModal.dataRoom.expiration_date"
                class = "text-stone-950"
              />
            </div>
            <div class="col-span-12 shadow p-2">
              <label
                for="services"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Service</label
              >
              <div class="grid grid-cols-4 gap-6 text-stone-950">
                <div v-for="(item, index) in services" :key="index">
                  <input
                    type="checkbox"
                    :id="`s_${index}`"
                    class="mr-2"
                    :value="item._id"
                    :checked="
                      roomModal.dataRoom.services
                        .map((s) => s._id)
                        .includes(item._id)
                    "
                    v-model="roomModal.dataRoom.services"
                  />
                  <label :for="`s_${index}`">{{ item.name }}</label>
                </div>
              </div>
            </div>
            <div class="col-span-12 shadow p-2">
              <Inputa
                label="Note"
                type="text"
                placeholder="Note something here"
                v-model="roomModal.dataRoom.description"
                class = "text-stone-950"
              />
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b justify-end"
          >
            <button
              @click="Submit"
              type="button"
              class="shadow text-stone-950 bg-sky-50 hover:bg-sky-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-item-end"
            >
              Save
            </button>
            <button
              data-modal-hide="roomModal"
              type="button"
              class="shadow text-stone-950 bg-sky-50 hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-item-end"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "../fetch/axios";
import { Modal } from "flowbite";
import moment from "moment";

export default {
    name: "rooms",
    data() {
        return {
            rooms: [],
            services: [],
            roomModal: {
                txtTitle: "",
                submitType: null,
                dataRoom: {
                    name: null,
                    group: null,
                    type: null,
                    price: null,
                    deposit: null,
                    debt: null,
                    day_of_hire: null,
                    expiration_date: null,
                    description: null,
                    services: [],
                },
            },
            modal: null,
        };
    },
    mounted() {
        this.getRooms();
        this.getServices();
        this.modal = new Modal(document.querySelector("#roomModal"));
    },
    methods: {
        formatMoney(value) {
            return value
                ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : null;
        },
        formatDate(value) {
            return value ? moment(value).format("DD/MM/YYYY") : null;
        },
        async getRooms() {
            const res = await axios.get("/room");
            this.rooms = await res.data.map((item) => {
                item.price_f = this.formatMoney(item.price);
                item.deposit_f = this.formatMoney(item.deposit);
                item.debt_f = this.formatMoney(item.debt);
                item.day_of_hire_f = this.formatDate(item.day_of_hire);
                item.expiration_date_f = this.formatDate(item.expiration_date);
                return item;
            });
        },
        async getServices() {
            const res = await axios.get("/service");
            this.services = res.data;
        },
        Create() {
            this.modal.toggle();
            this.roomModal = {
                txtTitle: "Add New Room",
                submitType: "create",
                dataRoom: {
                    name: null,
                    group: null,
                    type: null,
                    price: null,
                    deposit: null,
                    debt: null,
                    day_of_hire: null,
                    expiration_date: null,
                    description: null,
                    services: [],
                },
            };
        },
        Update(roomItem) {
            this.modal.toggle();

            this.roomModal = {
                txtTitle: "Edit Room",
                submitType: "update",
                dataRoom: {
                    _id: roomItem._id,
                    name: roomItem.name,
                    group: roomItem.group,
                    type: roomItem.type,
                    price: roomItem.price,
                    deposit: roomItem.deposit,
                    debt: roomItem.debt,
                    day_of_hire: roomItem.day_of_hire
                        ? moment(roomItem.day_of_hire).format("YYYY-MM-DD")
                        : null,
                    expiration_date: roomItem.expiration_date
                        ? moment(roomItem.expiration_date).format("YYYY-MM-DD")
                        : null,
                    description: roomItem.description,
                    services: roomItem.services.map((s) => s._id),
                },
            };
        },
        async Submit() {
            const submitType = this.roomModal.submitType;
            const data = this.roomModal.dataRoom;
            if (submitType === "create") {
                await axios.post("room/store", data);
            } else {
                const { _id, ...rest } = data;
                await axios.put(`room/update/${_id}`, rest);
            }
            await this.getRooms();
            this.modal.hide();
        },
        async Delete(_id) {
            await axios.delete(`room/delete/${_id}`);
            await this.getRooms();
        },
    },
};
</script>
