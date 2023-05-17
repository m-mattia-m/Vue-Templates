<template>
    <router-view></router-view>
</template>

<script setup lang="ts">

import {onMounted} from "vue";

const asdf = 1;

onMounted(()=>{
    console.log(asdf)
})

</script>

<style scoped lang="scss"></style>