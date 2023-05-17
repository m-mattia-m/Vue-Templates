import { NavigationGuard } from 'vue-router';
import { oidc } from '../../oidc';
import { useAuthStore } from '../../store/auth';

export const callbackGuard: NavigationGuard = async (to, from, next) => {
  const user = await oidc.signinCallback();

  const authStore = useAuthStore();

  if (user) {
    authStore.$patch({ me: user as any });

    next({
      name: 'home',
    });
  } else {
    next({
      name: 'auth.login',
    });
  }
};
