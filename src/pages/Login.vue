<template></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import { useAuthStore } from "../store/auth";

@Options({
  components: {},
})
export default class Login extends Vue {
  authStore = useAuthStore();
}
</script>

<style scoped lang="scss"></style>