const managerRoutes = [
  {
    path: '/',
    name: 'manager dashboard',
    component: () =>
      import(/* webpackChunkName: "manager" */ '../components/manager/Dashboard.vue'),
  },
  // {
  //   path: '/users',
  //   name: 'admin users',
  //   component: () =>
  //     import(/* webpackChunkName: "admin-view-users" */ '../components/admin/ViewUsers.vue'),
  // },
];

export default managerRoutes;
