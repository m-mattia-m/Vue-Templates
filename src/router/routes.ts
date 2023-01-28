import { RouteRecordRaw } from 'vue-router';
import { authenticatedGuard } from './guards/authenticated-guard';
import { callbackGuard } from './guards/callback-guard';
import { logoutGuard } from './guards/logout-gurard';
import Home from '../pages/Home.vue';
import Blank from '../pages/Blank.vue';
import { loginGuard } from './guards/login-guard';
import { Roles } from '../types/Roles';
import { roleGuard } from './guards/role-guard';
import Login from "../pages/Login.vue";

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'root', redirect: { name: 'home' } },
  {
    path: '/home',
    name: 'home',
    component: Home,
    // beforeEnter: [authenticatedGuard],
  },
  // TESTING
  {
    path: '/free',
    name: 'free',
    component: Blank,
    beforeEnter: [authenticatedGuard, roleGuard],
    meta: {
      roles: [Roles.FREE],
    },
  },
  {
    path: '/premium',
    name: 'premium',
    component: Blank,
    beforeEnter: [authenticatedGuard, roleGuard],
    meta: {
      roles: [Roles.PREMIUM],
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: Blank,
    beforeEnter: [authenticatedGuard, roleGuard],
    meta: {
      roles: [Roles.ADMIN],
    },
  },
  // END TESTING
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Blank,
  },
  {
    path: '/bye',
    name: 'bye',
    component: Blank,
  },
  {
    path: '/auth/',
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: Login,
        beforeEnter: [loginGuard],
      },
      {
        path: 'logout',
        name: 'auth.logout',
        component: Blank,
        beforeEnter: [logoutGuard],
      },
      {
        path: 'callback',
        name: 'auth.callback',
        component: Blank,
        beforeEnter: [callbackGuard],
      },
    ],
  },
];
