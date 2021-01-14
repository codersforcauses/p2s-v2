<template>
  <v-card flat rounded="xl">
    <FeathersVuexFind v-slot="{ items: [session] }" service="sessions" :params="{ query: searchQuery }" watch="params">
      <v-card flat class="rounded-tl-xl" style="overflow: hidden;">
        <v-tabs v-model="selectedTab" class="mb-2">
          <v-tab class="text-capitalize text-body-2">Next Session</v-tab>
          <v-tab class="text-capitalize text-body-2">Last Session</v-tab>
        </v-tabs>
        <div v-if="session" class="d-flex">
          <div class="d-flex-row pl-5">
            <div class="d-flex">
              <div class="text-h2 primary--text">{{ dayNum(session) }}</div>
              <div class="text-h5 primary--text">{{ dayOrdinal(session) }}</div>
            </div>
            <div class="text-body-1">{{ monthName(session) }}</div>
          </div>
          <v-divider
          inset vertical
          class="pl-7"
          />
          <div class="d-flex flex-column justify-space-between pl-7" @mouseover="viewOverlay = true" @mouseout="viewOverlay = false">
            <div class="text-subtitle-1">{{ formatTime(session) }} - {{ session.location }}</div>
            <div>{{ session.type }}</div>
            <div>{{ coachText(session) }}</div>
          </div>
        </div>
        <div v-else class="text-h6 pl-4">
          No Session Found
        </div>
      </v-card>
    </FeathersVuexFind>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Sessions</v-card-title>
    <v-card-text>
      View all the sessions on file
      <br />Create a new session to be used in lessons or programs
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" :to="{ name: 'view sessions' }">View All</v-btn>
      <v-btn text rounded color="primary" @click="sessionDialog = true">Create New</v-btn>
      <v-btn text rounded color="primary" @click="matrix = true">matrix</v-btn>
      <new-session v-model="sessionDialog" @created="this.$router.push({ path: `/session/${res._id}` })" />
      <matrix v-model="matrix" />
    </v-card-actions>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'

export default {
  components: {
    newSession: () => ({
      component: import('./CreateSession.vue'),
    }),
    matrix: () => ({
      component: import('./Matrix.vue'),
    }),
  },
  data() {
    return {
      selectedTab: 0,
      viewOverlay: false,
      sessionDialog: false,
      matrix: false,
    };
  },
  computed: {
    searchQuery() {
      const query = this.selectedTab === 0 ?
      {
        $limit: 1,
        date: {
          $gte: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]')
        },
        $sort: {
          date: 1
        }
      } :
       {
        $limit: 1,
        date: {
          $lt: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]')
        },
        $sort: {
          date: -1
        }
      }
      return query
    },
  },
  methods: {
    formatTime(session) {
      return dayjs(session.date).format('h:mma')
    },
    dayNum(session) {
      return dayjs(session.date).date()
    },
    dayOrdinal(session) {
      if (this.dayNum(session) > 3 && this.dayNum(session) < 21) return 'th';
      switch (this.dayNum(session) % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
    monthName(session) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const date = dayjs(session.date)
      return monthNames[date.month()]
    },
    coachText(session) {
      return session.coaches.length < 1 ? 'No Coaches Assigned' : `${session.coaches.length} Coach${session.coaches.length > 1 ? 'es' : ''} Assigned`
    },
  }
};
</script>

<style scoped>
  .subbutton {
    text-transform: none;
  }
</style>
