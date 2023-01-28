import { defineStore } from 'pinia';

interface ZitadelRole {
  [key: string]: {
    /**
     * granted timestamp: instance domain
     */
    [key: number]: string;
  };
}

interface Profile {
  c_hash: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string;
  given_name: string;
  locale: string;
  name: string;
  preferred_username: string;
  sub: string;
  updated_at: number;
  roles: string[];
  'urn:zitadel:iam:org:project:roles': ZitadelRole;
}

interface User {
  access_token: string;
  expires_at: string;
  id_token: string;
  profile: Profile;
  refresh_token: string;
  scope: string;
  session_state: string | null;
  token_type: 'Bearer';
}

export interface State {
  me: User | null;
}

export const useAuthStore = defineStore('user', {
  state: (): State => ({
    me: null,
  }),
  getters: {
    getMe: (state: State): any => {
      return state.me;
    },
    getIsAuthenticated: (state: State): boolean => {
      return !!state.me;
    },
    getBearerToken: (state: State): string | null => {
      return `${state.me?.token_type} ${state.me?.id_token}`;
    },
    getRoles: (state: State): string[] | null => {
      if (!state.me) {
        return [];
      }

      if (import.meta.env.VITE_ZITADEL == true) {
        if (!import.meta.env.VITE_ZITADEL_ROLE_ISSUER) {
          throw new Error('Zitadel Roles could not be initialized!');
        }

        const roles: string[] = [];

        const allRoles = state.me.profile['urn:zitadel:iam:org:project:roles'];

        for (const key of Object.keys(allRoles)) {
          const role = allRoles[key];
          const createdTimestamp = Object.keys(role)[0] as any as number;
          if (role[createdTimestamp] === import.meta.env.VITE_ZITADEL_ROLE_ISSUER)
            roles.push(key);
        }

        return roles;
      }

      return state.me.profile.roles;
    },
  },
  actions: {
    async clear(): Promise<void> {
      this.$patch({
        me: null,
      });
    },
  },
});
