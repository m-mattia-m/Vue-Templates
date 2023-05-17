import { UserManager, Log } from 'oidc-client-ts';

if (
  !import.meta.env.VITE_APP_URL ||
  !import.meta.env.VITE_OIDC_AUTHORITY ||
  !import.meta.env.VITE_OIDC_CLIENT_ID ||
  !import.meta.env.VITE_OIDC_PROJECT_SCOPES
) {
  throw new Error('OpenID Connect could not be initialized!');
}

export const appUrl = import.meta.env.VITE_APP_URL;

const projectScopes = import.meta.env.VITE_OIDC_PROJECT_SCOPES;

export const oidc = new UserManager({
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  client_secret: import.meta.env.VITE_OIDC_CLIENT_SECRET || undefined,
  redirect_uri: `${appUrl}auth/callback`,
  scope: `openid profile email offline_access ${projectScopes}`,
  response_type: 'code',
  automaticSilentRenew: true,
  loadUserInfo: true,
});

if (import.meta.env.DEV) {
  Log.setLogger(console);
}
