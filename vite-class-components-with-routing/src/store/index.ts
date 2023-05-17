import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PiniaLogger from 'pinia-logger';

export const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

if (import.meta.env.DEV) {
  pinia.use(
    PiniaLogger({
      logErrors: true,
      expanded: false,
      showStoreName: true,
      showDuration: true,
    })
  );
}
