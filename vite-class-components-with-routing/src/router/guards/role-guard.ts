import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../../store/auth';

export const roleGuard: NavigationGuard = async (to, from, next) => {
  if (!to.meta?.roles) {
    next();
  }

  const authStore = useAuthStore();

  try {
    const userRoles = authStore.getRoles;

    const roles = to.meta.roles as string[];

    for (const role of roles) {
      if (userRoles?.includes(role)) {
        next();
        return;
      }
    }

    throw new Error('User has not required role');
  } catch (error) {
    next({
      name: 'forbidden',
    });
  }
};
