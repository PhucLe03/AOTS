<script setup>
import Inputa from "../components/InputField.vue";
</script>

<template>
  <div>
    <div class="flex items-center justify-between my-5">
      <h1
        class="py-2 px-3 bg-sky-100 text-stone-950 text-sm font-semibold rounded-full shadow focus:outline-none"
      >
        Renters List
      </h1>
      <button
        class="px-5 p-1.5 rounded-full hover:bg-sky-100 font-bold text-stone-950 shadow focus:outline-none bg-green-500"
        type="button"
        @click="Export"
      >
        Export File
      </button>

      <button
        class="px-5 p-1.5 rounded-full hover:bg-sky-100 font-bold text-stone-950 shadow focus:outline-none"
        type="button"
        @click="Create"
      >
        Add renter
      </button>
    </div>

    <div class="relative mt-5 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">No.</th>
            <th scope="col" class="px-6 py-3">Full Name</th>
            <th scope="col" class="px-6 py-3">Information</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Room</th>
            <th scope="col" class="px-6 py-3">Contact</th>
            <th scope="col" class="px-6 py-3">State</th>
            <th scope="col" class="w-60"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in renters"
            :key="index"
            class="bg-white border-b"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">
              {{ item.name }}
            </td>
            <td class="px-6 py-4">
              <p>Phone: {{ item.phone }}</p>
              <p>ID: {{ item.id_card }}</p>
              <p>Date of Birth: {{ item.birth_day_f }}</p>
              <p>Gender: {{ item.sex_f }}</p>
            </td>
            <td class="px-6 py-4">
              {{ item.address_f }}
            </td>
            <td class="px-6 py-4">
              {{ item.room?.name }}
            </td>
            <td class="px-6 py-4">
              {{ item.main_contact ? "✓" : "" }}
            </td>
            <td class="px-6 py-4">
              {{ item.status }}
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
      id="renterModal"
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
              {{ renterModal.txtTitle }}
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div>
              <div class="relative mb-6 shadow p-2">
                <Inputa
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  v-model="renterModal.dataRenter.name"
                  class="text-stone-950"
                />
              </div>
            </div>
            <div class="flex justify-between gap-6">
              <div class="w-full shadow p-2">
                <Inputa
                  label="Phone number"
                  type="text"
                  placeholder="Enter your phone number"
                  v-model="renterModal.dataRenter.phone"
                  class="text-stone-950"
                />
              </div>
              <div class="w-full shadow p-2">
                <Inputa
                  label="Identifier"
                  type="text"
                  placeholder="Enter ID"
                  v-model="renterModal.dataRenter.id_card"
                  class="text-stone-950"
                />
              </div>
            </div>
            <div class="flex justify-between gap-6">
              <div class="w-full shadow p-2">
                <Inputa
                  label="Date of Birth"
                  type="date"
                  placeholder="Enter your date of birth"
                  v-model="renterModal.dataRenter.birth_day"
                  class="text-stone-950"
                />
              </div>
              <div class="w-full shadow p-2">
                <label class="block mb-2 text-sm font-medium text-gray-900"
                  >Gender</label
                >
                <div class="flex items-center gap-6">
                  <div>
                    <input
                      type="radio"
                      class="mr-3"
                      id="s_t"
                      value="true"
                      v-model="renterModal.dataRenter.sex"
                    />
                    <label class="text-stone-950" for="s_t">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      class="mr-3"
                      id="s_f"
                      value="false"
                      v-model="renterModal.dataRenter.sex"
                    />
                    <label class="text-stone-950" for="s_f">Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-6">
              <div class="w-full shadow p-2">
                <Inputa
                  label="Province"
                  type="text"
                  placeholder="Enter your province"
                  v-model="renterModal.dataRenter.province"
                  class="text-stone-950"
                />
              </div>
              <div class="w-full shadow p-2">
                <Inputa
                  label="District"
                  type="text"
                  placeholder="Enter your district"
                  v-model="renterModal.dataRenter.district"
                  class="text-stone-950"
                />
              </div>
              <div class="w-full shadow p-2">
                <Inputa
                  label="Commune"
                  type="text"
                  placeholder="Enter your commune"
                  v-model="renterModal.dataRenter.commune"
                  class="text-stone-950"
                />
              </div>
            </div>
            <div class="shadow p-2">
              <Inputa
                label="Address"
                type="text"
                placeholder="Enter your address"
                v-model="renterModal.dataRenter.address"
                class="text-stone-950"
              />
            </div>
            <div class="flex justify-between gap-6">
              <div class="w-full shadow p-2">
                <Inputa
                  label="State"
                  type="text"
                  placeholder="Enter your state"
                  v-model="renterModal.dataRenter.status"
                  class="text-stone-950"
                />
              </div>
              <div class="flex items-center w-full shadow p-2">
                <input
                  type="checkbox"
                  name="main_contact"
                  class="mr-3"
                  id="main_contact"
                  value="true"
                  v-model="renterModal.dataRenter.main_contact"
                />
                <label
                  for="main_contact"
                  class="text-sm font-medium text-gray-900"
                  >Main contact</label
                >
              </div>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Room</label
              >
              <div class="grid grid-cols-3 gap-3 text-stone-950">
                <div v-for="(item, index) in rooms" :key="index">
                  <input
                    type="radio"
                    name="room"
                    :id="`s_${index}`"
                    class="mr-2"
                    :value="item._id"
                    v-model="renterModal.dataRenter.room"
                  />
                  <label :for="`s_${index}`">{{ item.name }}</label>
                </div>
              </div>
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
  name: "renters",
  data() {
    return {
      renters: [],
      rooms: [],
      renterModal: {
        txtTitle: "",
        submitType: null,
        dataRenter: {
          name: null,
          phone: null,
          id_card: null,
          birth_day: null,
          province: null,
          district: null,
          commune: null,
          address: null,
          room: null,
          main_contact: null,
          status: null,
        },
      },
      modal: null,
    };
  },
  async mounted() {
    this.getRenters();
    this.getRooms();
    this.modal = new Modal(document.querySelector("#renterModal"));
  },
  methods: {
    async getRenters() {
      const res = await axios.get("/renter");
      this.renters = await res.data.map((item) => {
        item.birth_day_f = moment(item.birth_day).format("DD/MM/YYYY");
        item.sex_f = item.sex ? "Nam" : "Nữ";
        item.address_f = `${item.address}, ${item.commune}, ${item.district}, ${item.province}`;
        return item;
      });
    },
    async getRooms() {
      const res = await axios.get("/room");
      this.rooms = res.data;
    },
    Create() {
      this.modal.toggle();
      this.renterModal = {
        txtTitle: "Add New Renter",
        submitType: "create",
        dataRenter: {
          name: null,
          phone: null,
          id_card: null,
          birth_day: null,
          province: null,
          district: null,
          commune: null,
          address: null,
          room: null,
          main_contact: null,
          status: null,
        },
      };
    },
    Update(renterItem) {
      this.modal.toggle();

      this.renterModal = {
        txtTitle: "Edit Renter",
        submitType: "update",
        dataRenter: {
          _id: renterItem._id,
          name: renterItem.name,
          phone: renterItem.phone,
          id_card: renterItem.id_card,
          birth_day: renterItem.birth_day
            ? moment(renterItem.birth_day).format("YYYY-MM-DD")
            : null,
          sex: renterItem.sex,
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
      const submitType = this.renterModal.submitType;
      const data = this.renterModal.dataRenter;
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

    async Export_d() {
      try {
        // Make a GET request to the Node.js endpoint for exporting DOCX
        const response = await axios.get("/renter/export", {
          responseType: "blob", // Specify responseType as 'blob' to receive binary data
        });

        // Create a Blob and create a download link for DOCX
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Specify the correct MIME type for DOCX
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "renters.docx"; // Change the file name to .docx
        a.click();

        // Clean up by revoking the Object URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
        // Handle errors as needed
      }
    },
  },
};
</script>
