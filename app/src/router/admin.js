const adminRoutes = [
  {
    path: '/',
    name: 'admin dashboard',
    component: () => import(/* webpackChunkName: "admin" */ '../components/AdminDashboard.vue'),
  },
];

export default adminRoutes;
