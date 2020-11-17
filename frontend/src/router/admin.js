const adminRoutes = [
  {
    path: '/',
    name: 'admin dashboard',
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/Dashboard.vue'),
  },
  {
    path: '/staff',
    name: 'view staff',
    component: () =>
      import(
        /* webpackChunkName: "admin-view-users" */ '../components/admin/StaffCard/ViewUsers/index.vue'
      ),
  },
];

export default adminRoutes;
