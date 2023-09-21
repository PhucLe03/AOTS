<template>
    <div class="User">
        <h2>User Profile</h2>
        <p>User Name: {{ $route.params.name }}  </p>
    </div>
</template>

<script>
export default {
    name: "UserView",
};
</script>
