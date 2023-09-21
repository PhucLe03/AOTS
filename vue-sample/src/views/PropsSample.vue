<template>
    <div class="PropsSample">
        <h4>Props Sample</h4>
        <p>message from parent: {{ message }}</p>
        <p>number from parent: {{ number }}</p>
    </div>
</template>

<script>
export default {
    name: "PropsSample",
    props: ["message", "number"],
};
</script>
