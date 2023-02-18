import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store/index';

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
    path: '/reset',
    name: 'reset',
    component: () => import(/* webpackChunkName: "login" */ '../views/Reset.vue'),
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
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/Cards'
          ),
      },
      {
        path: '/sessions',
        name: 'view-sessions',
        component: () =>
          import(
            /* webpackChunkName: "view-sessions" */ '../components/Session/ViewSessions'
          ),
      },
      {
        path: '/session/:id',
        name: 'session-page',
        component: () =>
          import(
            /* webpackChunkName: "view-session" */ '../components/Session/SessionDetail'
          ),
      },
      {
        path: '/users/:id?',
        name: 'view-users',
        component: () =>
          import(
            /* webpackChunkName: "view-users" */ '../components/User/ViewUsers'
          ),
      },
      {
        path: '/schools/:id?',
        name: 'view-schools',
        component: () =>
          import(
            /* webpackChunkName: "view-schools" */ '../components/School/ViewSchools'
          ),
      },
      {
        path: '/students/:id?',
        name: 'view-students',
        component: () =>
          import(
            /* webpackChunkName: "view-schools" */ '../components/Student/ViewStudents'
          ),
      },
      {
        path: 'settings',
        name: 'user-settings',
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
