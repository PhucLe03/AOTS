<template>
  <div class="row">
    <div class="col-4">
      <InputField label="Name" />
    </div>
    <div class="col-4">
      <InputField label="Group" />
    </div>
    <div class="col-4">
      <InputField label="Type" />
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <InputField label="Price" />
    </div>
    <div class="col-4">
      <InputField label="Date of hire" />
    </div>
    <div class="col-4">
      <InputField label="Expiration Date" />
    </div>
  </div>
</template>

<script>
import InputField from "../APIs/InputField.vue";
export default {
  name: "FakeRoomModal",
  components: {
    InputField,
  },
};
</script>
