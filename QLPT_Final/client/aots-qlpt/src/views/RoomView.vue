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
      <table class="w-full text-sm text-left text-gray-500 text-center">
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
              <p>Giá: {{ item.price_f }}</p>
              <p>Cọc: {{ item.deposit_f }}</p>
              <p>Nợ: {{ item.debt_f }}</p>
            </td>
            <td>
              <p>Số người thuê: {{ item.numberOfRenters }}</p>
              <p>
                Thời gian thuê: {{ item.day_of_hire_f }} -
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
            <h3 class="text-xl font-semibold text-gray-900">
              {{ roomModal.txtTitle }}
            </h3>
          </div>
          <!-- Modal body -->
          <div class="grid grid-cols-12 gap-3 p-6">
            <div class="col-span-12">
              <Inputa
                label="Tên Phòng"
                type="text"
                placeholder="Tên Phòng"
                v-model="roomModal.dataRoom.name"
              />
            </div>
            <div class="col-span-6">
              <Inputa
                label="Nhóm"
                type="text"
                placeholder="Tầng 1, Tầng 2, Tầng 3,..."
                v-model="roomModal.dataRoom.group"
              />
            </div>
            <div class="col-span-6">
              <Inputa
                label="Loại phòng"
                type="text"
                placeholder="Đã thuê, Còn trống, Đang sửa chữa,..."
                v-model="roomModal.dataRoom.type"
              />
            </div>
            <div class="col-span-4">
              <Inputa
                label="Giá"
                type="number"
                placeholder="Giá"
                v-model="roomModal.dataRoom.price"
              />
            </div>
            <div class="col-span-4">
              <Inputa
                label="Cọc"
                type="number"
                placeholder="Cọc"
                v-model="roomModal.dataRoom.deposit"
              />
            </div>
            <div class="col-span-4">
              <Inputa
                label="Còn nợ"
                type="number"
                placeholder="Còn nợ"
                v-model="roomModal.dataRoom.debt"
              />
            </div>
            <div class="col-span-6">
              <Inputa
                label="Còn nợ"
                type="date"
                v-model="roomModal.dataRoom.day_of_hire"
              />
            </div>
            <div class="col-span-6">
              <Inputa
                label="Ngày trả phòng"
                type="date"
                v-model="roomModal.dataRoom.expiration_date"
              />
            </div>
            <div class="col-span-12">
              <label
                for="services"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Dịch vụ</label
              >
              <div class="grid grid-cols-4 gap-6">
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
            <div class="col-span-12">
              <Inputa
                label="Ghi chú"
                type="text"
                placeholder="Ghi chú"
                v-model="roomModal.dataRoom.description"
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
  async mounted() {
    this.getRooms();
    this.getServices();
    this.modal = new Modal(document.querySelector("#roomModal"));
  },
  methods: {
    async getServices() {
      const res = await axios.get("/service");
      this.services = res.data;
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
    formatMoney(value) {
      return value
        ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : null;
    },
    formatDate(value) {
      return value ? moment(value).format("DD/MM/YYYY") : null;
    },
    Create() {
      this.modal.toggle();
      this.roomModal = {
        txtTitle: "Thêm mới phòng thuê",
        submitType: "create",
        dataRenter: {
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
    Update(renterItem) {
      console.log(renterItem._id);
      this.modal.toggle();

      this.roomModal = {
        txtTitle: "Chỉnh sửa khách trọ",
        submitType: "update",
        dataRenter: {
          _id: renterItem._id,
          name: renterItem.name,
          phone: renterItem.phone,
          id_card: renterItem.id_card,
          birth_day: moment(renterItem.birth_day).format("YYYY-MM-DD"),
          sex: renterItem.sex,
          // depossexit: renterItem.depossexit,
          province: renterItem.province,
          district: renterItem.district,
          commune: renterItem.commune,
          address: renterItem.address,
          room: renterItem.room._id,
          main_contact: renterItem.main_contact,
          status: renterItem.status,
        },
      };
    },
    async Submit() {
      const submitType = this.roomModal.submitType;
      const data = this.roomModal.dataRenter;
      if (submitType === "create") {
        await axios.post("renter/store", data);
      } else {
        const { _id, ...rest } = data;
        await axios.put(`renter/update/${_id}`, rest);
      }
      await this.getRenters();
      this.modal.hide();
    },
    async Delete(_id) {
      await axios.delete(`renter/delete/${_id}`);
      await this.getRenters();
    },
    async Export() {
      // Make a GET request to the Node.js endpoint
      const response = await axios.get("/renter/export", {
        responseType: "blob", // Specify responseType as 'blob' to receive binary data
      });

      // Create a Blob and create a download link
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "renters.xlsx";
      a.click();

      // Clean up by revoking the Object URL
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>
