<template>
  <div class="row">
    <div class="col-7">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="Name"
        />
        <label class="form-label">Name</label>
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="col-5">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="Phone"
        />
        <label class="form-label">Phone</label>
        <span class="text-danger"></span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-5">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="idcard"
        />
        <label class="form-label">ID Number</label>
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="col-3">
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="floatingSelect"
        >
          <option selected>Choose</option>
          <option value="true">Male</option>
          <option value="false">Female</option>
        </select>
        <label class="form-label">Gender</label>
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="col-4">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="date"
          placeholder="Birthday"
        />
        <label class="form-label">Birthday</label>
        <span class="text-danger"></span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="Province"
        />
        <label class="form-label">Province</label>
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="col-4">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="District"
        />
        <label class="form-label">District</label>
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="col-4">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="Commune"
        />
        <label class="form-label">Commune</label>
        <span class="text-danger"></span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-8">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="Address"
        />
        <label class="form-label">Address</label>
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="col-4">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          placeholder="Room"
        />
        <label class="form-label">Room</label>
        <span class="text-danger"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FakeUserModal",
};
</script>
