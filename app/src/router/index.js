import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store/index';

import AdminRoutes from './admin';
import CoachRoutes from './coach';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "404page" */ '../views/404.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => next({ name: 'dashboard' }))
        .catch(() => next());
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "login" */ '../views/Register.vue'),
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => next({ name: 'dashboard' }))
        .catch(() => next());
      if(!to.query.verifyToken) next({ name: 'login' });
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: { requiresAuth: true },
    beforeEnter(to, _, next) {
      if (to.fullPath === '/') {
        const user = Store.getters['auth/user'];
        if (user?.admin?.is) {
          next({ path: '/admin' });
        } else if (user?.coach?.is) {
          next({ path: '/coach' });
        } else {
          next({ name: 'error' });
        }
      } else {
        next();
      }
    },
    children: [
      {
        path: 'admin',
        component: () => import(/* webpackChunkName: "admin" */ '../components/layout/Admin.vue'),
        meta: { permission: 'admin' },
        children: AdminRoutes,
      },
      {
        path: 'coach',
        component: () => import(/* webpackChunkName: "coach" */ '../components/layout/Coach.vue'),
        meta: { permission: 'coach' },
        children: CoachRoutes,
      },
      {
        path: 'settings',
        component: () =>
          import(/* webpackChunkName: "user_settings" */ '../components/other/Settings.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const { user } = await Store.dispatch('auth/authenticate');
      const requiredPerm = to.matched.find(record => record.meta.permission)?.meta?.permission;
      if (requiredPerm) {
        if (user[requiredPerm].is) {
          next();
        } else {
          next({ name: 'error' });
        }
      } else {
        next();
      }
    } catch {
      next({ name: 'login' });
    }
  } else next();
});

export default router;
