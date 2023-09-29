<template>
  <div class="row">
    <div class="col-7">
      <InputField label="Name"/>
    </div>
    <div class="col-5">
      <InputField label="Phone"/>
    </div>
  </div>
  <div class="row">
    <div class="col-5">
      <InputField label="ID Number"/>
    </div>
    <div class="col-3">
      <InputField label="Gender"/>
    </div>
    <div class="col-4">
      <InputField label="Birthday"/>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <InputField label="Province"/>
    </div>
    <div class="col-4">
      <InputField label="Dítrict"/>
    </div>
    <div class="col-4">
      <InputField label="Commune"/>
    </div>
  </div>
  <div class="row">
    <div class="col-8">
      <InputField label="Address"/>
    </div>
    <div class="col-4">
      <InputField label="Room"/>
    </div>
  </div>
</template>

<script>
import InputField from '../APIs/InputField.vue';

export default {
  name: "FakeUserModal",
  components: {
    InputField,
  }
};
</script>
