<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" xl="3" v-for="i in columns" :key="i" class="py-0">
      <v-row>
        <v-col cols="12" v-for="(card, index) in cards" :key="index" v-show="index % columns === i - 1">
          <component :is="card" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      cards: [
        'staff-card',
        'session-card',
        'program-card',
        'student-card',
        'school-card',
      ],
    };
  },
  components: {
    'staff-card': () => import('./StaffCard'),
    'program-card': () => import('./ProgramCard'),
    'session-card': () => import('./SessionCard'),
    'student-card': () => import('./StudentCard'),
    'school-card': () => import('./SchoolCard'),
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    columns() {
      // eslint-disable-next-line
      return this.width < 600 ? 1 : this.width < 960 ? 2 : 3;
    },
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>
