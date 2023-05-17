import { NavigationGuard } from 'vue-router';
import { oidc } from '../../oidc';
import { useAuthStore } from '../../store/auth';

export const logoutGuard: NavigationGuard = async (to, from, next) => {
  const authStore = useAuthStore();

  await oidc.revokeTokens();
  await oidc.removeUser();

  await authStore.clear();

  next({
    name: 'bye',
  });
};
