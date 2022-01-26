const adminRoutes = [
  {
    path: '/',
    name: 'admin dashboard',
    component: () => import(/* webpackChunkName: "admin" */ '../components/AdminDashboard.vue'),
  },
  {
    path: '/staff',
    name: 'view staff',
    component: () =>
      import(
        /* webpackChunkName: "admin-view-users" */ '../components/Staff/ViewUsers'
      ),
  },
  {
    path: '/schools',
    name: 'view schools',
    component: () =>
      import(
        /* webpackChunkName: "admin-view-schools" */ '../components/School/ViewSchools'
      ),
  },
  {
    path: '/students',
    name: 'view students',
    component: () =>
      import(
        /* webpackChunkName: "admin-view-schools" */ '../components/Student/ViewStudents'
      ),
  },
];

export default adminRoutes;
