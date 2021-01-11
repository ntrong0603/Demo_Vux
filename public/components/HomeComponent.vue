<!-- Template -->
<template>
    <div>
        Component Home
        <div class="circle"></div>
    </div>
</template>
<!-- process -->
<script>
// import component
// import Name from "@/components/Name.vue";

export default {
    data() {
        return {};
    },
    methods: {},
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    mounted() {
        console.log("Example Component mounted.");
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
};
</script>
<!-- css -->
<style scoped>
.circle {
    width: 50px;
    height: 50px;
    border: 5px solid red;
    border-radius: 50%;
    box-shadow: 0 0 0 5px blue, 0 0 0 10px green;
}
</style>
