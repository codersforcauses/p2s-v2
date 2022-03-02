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
        path: '/sessions',
        name: 'view sessions',
        component: () =>
          import(
            /* webpackChunkName: "view-sessions" */ '../components/Session/ViewSessions'
          ),
      },
      {
        path: '/session/:id',
        name: 'session page',
        component: () =>
          import(
            /* webpackChunkName: "view-session" */ '../components/Session/SessionDetail'
          ),
      },
      {
        path: '/staff',
        name: 'view staff',
        component: () =>
          import(
            /* webpackChunkName: "view-users" */ '../components/Staff/ViewUsers'
          ),
      },
      {
        path: '/schools/:id?',
        name: 'view schools',
        component: () =>
          import(
            /* webpackChunkName: "view-schools" */ '../components/School/ViewSchools'
          ),
      },
      {
        path: '/students',
        name: 'view students',
        component: () =>
          import(
            /* webpackChunkName: "view-schools" */ '../components/Student/ViewStudents'
          ),
      },
      {
        path: 'settings',
        name: 'user settings',
        component: () =>
          import(/* webpackChunkName: "user-settings" */ '../components/other/Settings.vue'),
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
