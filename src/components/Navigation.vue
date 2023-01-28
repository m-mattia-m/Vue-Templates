<template>
  <div class="nav">
    <div class="nav__element" v-for="page in pages">
      <router-link
        v-if="page.requireLoggedIn === isAuthenticated"
        :to="{ path: page.path }"
        tag="button"
      >
        <v-btn variant="text" class="nav__button">
          {{ page.name }}
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';
import {useAuthStore} from "../store/auth";

class Props {
  pages = prop<Array<any>>({ required: true });
}

@Options({
  components: {},
})
export default class Navigation extends Vue.with(Props) {
  authStore = useAuthStore();

  get isAuthenticated(): boolean {
    return this.authStore.getIsAuthenticated;
  }
}
</script>

<style scoped lang="scss">
.nav {
  width: 100%;
  color: #213547;
  border-color: #213547;
  display: flex;
  justify-content: end;
  height: 3rem;
}

a {
  text-decoration: none;
  color: #213547;
}
</style>
