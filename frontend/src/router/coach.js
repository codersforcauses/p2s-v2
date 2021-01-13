const coachRoutes = [
  {
    path: '/',
    name: 'coach dashboard',
    component: () => import(/* webpackChunkName: "coach" */ '../components/coach/Dashboard.vue'),
  },
  // {
  //   path: '/users',
  //   name: 'admin users',
  //   component: () =>
  //     import(/* webpackChunkName: "admin-view-users" */ '../components/admin/ViewUsers.vue'),
  // },
  {
    path: '/sessions',
    name: 'view sessions',
    component: () =>
      import(
        /* webpackChunkName: "coach-view-sessions" */ '../components/SessionCard/ViewSessions/index.vue'
      ),
  },
  {
    path: '/session/:id',
    name: 'session page',
    component: () =>
      import(
        /* webpackChunkName: "coach-view-session" */ '../components/coach/session/index.vue'
      ),
  },
];

export default coachRoutes;
