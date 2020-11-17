import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store/index';

import AdminRoutes from './admin';
import ManagerRoutes from './manager';
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
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    // meta: { requiresAuth: true },
    // beforeEnter(to, from, next) {
    // if (to.fullPath === '/') {
    //   const user = Store.getters['users/get'];
    //   if (user.admin.is) {
    //     next({ name: 'admin' });
    //   } else if (user.manager.is) {
    //     next({ name: 'manager' });
    //   } else if (user.coach.is) {
    //     next({ name: 'coach' });
    //   } else {
    //     next({ name: 'error' });
    //   }
    // } else {
    //   next();
    // }
    // },
    children: [
      {
        path: 'admin',
        component: () => import(/* webpackChunkName: "admin" */ '../components/admin/index.vue'),
        // meta: { permission: 'admin' },
        children: AdminRoutes,
      },
      {
        path: 'manager',
        component: () =>
          import(/* webpackChunkName: "manager" */ '../components/manager/index.vue'),
        // meta: { permission: 'manager' },
        children: ManagerRoutes,
      },
      {
        path: 'coach',
        component: () => import(/* webpackChunkName: "coach" */ '../components/coach/index.vue'),
        // meta: { permission: 'coach' },
        children: CoachRoutes,
      },
      {
        path: 'settings',
        component: () =>
          import(/* webpackChunkName: "user_settings" */ '../components/user/Settings.vue'),
        // meta: { requiresAuth: true },
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    try {
      await Store.dispatch('auth/authenticate');
    } catch {
      next({ name: 'login' });
    }
    const requiredPerm = to.matched.find(record => record.meta.permission);
    if (requiredPerm !== undefined) {
      if (Store.getters['auth/user'][requiredPerm.meta.permission].is) {
        next();
      } else {
        next({ name: 'error' });
      }
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
