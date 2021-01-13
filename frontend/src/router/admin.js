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
  {
    path: '/schools',
    name: 'view schools',
    component: () =>
      import(
        /* webpackChunkName: "admin-view-schools" */ '../components/admin/SchoolCard/ViewSchools/index.vue'
      ),
  },
  {
    path: '/sessions',
    name: 'view sessions',
    component: () =>
      import(
        /* webpackChunkName: "admin-view-schools" */ '../components/SessionCard/ViewSessions/index.vue'
      ),
  },
];

export default adminRoutes;
