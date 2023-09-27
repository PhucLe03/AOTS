<template>
  <InputField label="Name"/>
  <InputField label="Unit"/>
  <InputField label="Unit"/>
</template>

<script>
import InputField from "../APIs/InputField.vue";
export default {
  name: "FakeServiceModal",
  components: {
    InputField,
  },
};
</script>
