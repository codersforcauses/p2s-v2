const coachRoutes = [
  {
    path: '/',
    name: 'coach dashboard',
    component: () => import(/* webpackChunkName: "coach" */ '../components/CoachDashboard.vue'),
  },
  {
    path: '/sessions',
    name: 'view sessions',
    component: () =>
      import(
        /* webpackChunkName: "coach-view-sessions" */ '../components/Session/ViewSessions'
      ),
  },
  {
    path: '/session/:id',
    name: 'session page',
    component: () =>
      import(
        /* webpackChunkName: "coach-view-session" */ '../components/Session/ViewSessions'
      ),
  },
];

export default coachRoutes;
