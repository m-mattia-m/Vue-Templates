<template>
  <Navigation :pages="pages"></Navigation>
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navigation from './components/Navigation.vue';
import { useAuthStore } from './store/auth';
import {Roles} from "./types/Roles";

@Options({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  authStore = useAuthStore();

  pages = [
    {
      name: 'Home',
      requireLoggedIn: false,
      requireRole: Roles.FREE,
      path: '/'
    },
    {
      name: 'Login',
      requireLoggedIn: false,
      requireRole: Roles.FREE,
      path: '/auth/login',
    },
    {
      name: 'Logout',
      requireLoggedIn: true,
      requireRole: Roles.FREE,
      path: '/auth/logout',
    },
  ];
}
</script>

<style scoped lang="scss">
.routerView {
  height: calc(100% - 3rem);
  width: 100%;
}

</style>
