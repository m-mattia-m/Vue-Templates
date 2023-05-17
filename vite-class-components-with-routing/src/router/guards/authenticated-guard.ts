import { NavigationGuard } from 'vue-router';
import { oidc } from '../../oidc';
import { useAuthStore } from '../../store/auth';

export const authenticatedGuard: NavigationGuard = async (to, from, next) => {
  const user = await oidc.getUser();

  const authStore = useAuthStore();

  if (user) {
    authStore.$patch({ me: user as any });
    next();
  } else {
    next({
      name: 'auth.login',
    });
  }
};
