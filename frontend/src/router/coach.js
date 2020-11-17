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
];

export default coachRoutes;
