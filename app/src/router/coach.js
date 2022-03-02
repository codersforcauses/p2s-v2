const coachRoutes = [
  {
    path: '/',
    name: 'coach dashboard',
    component: () => import(/* webpackChunkName: "coach" */ '../components/CoachDashboard.vue'),
  }
];

export default coachRoutes;
