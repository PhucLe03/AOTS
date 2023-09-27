<template>
  <div>
    <div class="flex justify-between items-center my-5">
      <h1
        class="py-2 px-3 bg-sky-100 text-stone-950 text-sm font-semibold rounded-full shadow focus:outline-none"
      >
        Services List
      </h1>
      <button
        class="px-5 p-1.5 rounded-full hover:bg-sky-100 font-bold text-stone-950 shadow focus:outline-none"
        type="button"
        @click="Create"
      >
        Add Service
      </button>
    </div>
    <div class="relative overflow-x-auto mt-5">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-stone-950 uppercase bg-sky-100">
          <tr>
            <th scope="col" class="px-6 py-3">No.</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Unit</th>
            <th scope="col" class="w-60"></th>
          </tr>
        </thead>

        <tbody>
          <tr></tr>
          <tr
            v-for="(item, index) in services"
            :key="index"
            class="bg-white border-b"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-dark-900 whitespace-nowrap"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">
              {{ item.name }}
            </td>
            <td class="px-6 py-4">
              {{ item.price }}
            </td>
            <td class="px-6 py-4">
              {{ item.unit }}
            </td>
            <td class="px-6 py-4 flex justify-center gap-2">
              <button
                @click="Update(item)"
                class="px-4 py-1 rounded bg-cyan-700 text-white font-bold"
              >
                Edit
              </button>
              <button
                @click="Delete(item._id)"
                class="px-4 py-1 rounded bg-red-800 text-white font-bold"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      id="serviceModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow">
          <!-- header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t bg-sky-600"
          >
            <h3 class="text-zinc-50 font-bold">
              {{ serviceModal.txtTitle }}
            </h3>
          </div>
          <!-- body -->
          <div class="p-6 space-y-6">
            <!-- ten dich vu -->
            <div>
              <label
                for="name"
                class="block mb-2 text-base font-medium text-gray-900"
              >
                Service name
              </label>
              <div class="relative mb-6">
                <input
                  type="text"
                  id="name"
                  placeholder="Tên dịch vụ"
                  v-model="serviceModal.dataService.name"
                  class="text-stone-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
            <!-- don gia -->
            <div class="flex justify-between gap-6">
              <div class="w-full">
                <label
                  for="price"
                  class="block mb-2 text-base font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  id="price"
                  class="text-stone-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Giá"
                  v-model="serviceModal.dataService.price"
                />
              </div>
              <!-- don vi tinh -->
              <div class="w-full">
                <label
                  for="unit"
                  class="block mb-2 text-base font-medium text-gray-900"
                >
                  Unit
                </label>
                <input
                  type="text"
                  id="unit"
                  class="text-stone-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Đơn vị"
                  v-model="serviceModal.dataService.unit"
                />
              </div>
            </div>
          </div>

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
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../fetch/axios";
import { Modal } from "flowbite";

export default {
  // props: [],
  name: "services",
  data() {
    return {
      services: [],
      serviceModal: {
        txtTitle: "",
        submitType: null,
        dataService: {
          name: null,
          price: null,
          unit: null,
        },
      },
      modal: null,
    };
  },
  async mounted() {
    this.modal = new Modal(document.querySelector("#serviceModal"));
    await this.getServices();
  },
  methods: {
    async getServices() {
      const res = await axios.get("/service");
      this.services = res.data;
    },
    async Create() {
      this.modal.toggle();
      this.serviceModal = {
        txtTitle: "Add New Service",
        submitType: "create",
        dataService: {
          name: null,
          price: null,
          unit: null,
        },
      };
    },
    async Update(serviceItem) {
      this.modal.toggle();
      this.serviceModal = {
        txtTitle: "Edit Service",
        submitType: "update",
        dataService: {
          _id: serviceItem._id,
          name: serviceItem.name,
          price: serviceItem.price,
          unit: serviceItem.unit,
        },
      };
    },
    async Submit() {
      const submitType = this.serviceModal.submitType;
      const data = this.serviceModal.dataService;

      if (submitType === "create") {
        // "service/store" là url của backend apis
        await axios.post("service/store", data);
      } else {
        const { _id, ...rest } = data;
        await axios.put(`service/update/${_id}`, rest);
      }

      await this.getServices();
      this.modal.hide();
    },
    async Delete(_id) {
      await axios.delete(`service/delete/${_id}`);
      await this.getServices();
    },
  },
};
</script>
