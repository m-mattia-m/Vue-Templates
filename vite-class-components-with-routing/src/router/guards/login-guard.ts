import { NavigationGuard } from 'vue-router';
import { oidc } from '../../oidc';
import { useAuthStore } from '../../store/auth';

export const loginGuard: NavigationGuard = async (to, from) => {
  const authStore = useAuthStore();

  authStore.clear();

  await oidc.signinRedirect();
};
