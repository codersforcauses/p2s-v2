<template>
  <v-card flat rounded="xl">
    <v-card flat class="rounded-tl-xl" style="overflow: hidden;">
      <v-tabs v-model="selectedTab" class="mb-2">
        <v-tab class="text-capitalize text-body-2">Next Session</v-tab>
        <v-tab class="text-capitalize text-body-2">Last Session</v-tab>
      </v-tabs>
      <div v-if="selectedSession" class="d-flex">
        <div class="d-flex-row pl-5">
          <div class="d-flex">
            <div class="text-h2 primary--text">{{ dayNum }}</div>
            <div class="text-h5 primary--text">{{ dayOrdinal }}</div>
          </div>
          <div class="text-body-1">{{ monthName }}</div>
        </div>
        <v-divider
        inset vertical
        class="pl-5"
        />
        <div class="d-flex flex-column justify-space-between pl-5">
          <div class="text-subtitle-1">{{ formatTime }} - {{ selectedSession.location }}</div>
          <div>{{ selectedSession.type }}</div>
          <div>{{ coachText }}</div>
        </div>
      </div>
      <div v-else class="text-h6 pl-4">
        No Session Found
      </div>
    </v-card>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Sessions</v-card-title>
    <v-card-text>
      View all the sessions on file
      <br />Create a new session to be used in lessons or programs
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary">View All</v-btn>
      <v-btn text rounded color="primary" @click="sessionDialog = true">Create New</v-btn>
      <new-session v-model="sessionDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>

import dayjs from 'dayjs'
import seeds from '../../../seeds'

const { sessions, users } = seeds

export default {
  components: {
    newSession: () => ({
      component: import('./CreateSession.vue'),
    }),
  },
  data() {
    return {
      selectedTab: 0,
      sessionDialog: false,
      sessions,
      users
    };
  },
  computed: {
    nextSession() {
      return sessions.filter(
        (session) => dayjs(session.date).isAfter(dayjs())
      ).reduce((acc, curr) => {
        if(dayjs(curr.date).isBefore(dayjs(acc.date))) return curr
        return acc
      })
    },
    lastSession() {
      return sessions.filter(
        (session) => dayjs(session.date).isBefore(dayjs())
      ).reduce((acc, curr) => {
        if(dayjs(curr.date).isAfter(dayjs(acc.date))) return curr
        return acc
      })
    },
    selectedSession() {
      return this.selectedTab === 0 ? this.nextSession : this.lastSession
    },
    formatTime() {
      return dayjs(this.selectedSession.date).format('h:mma')
    },
    dayNum() {
      return dayjs(this.selectedSession.date).date()
    },
    dayOrdinal() {
      if (this.dayNum > 3 && this.dayNum < 21) return 'th';
      switch (this.dayNum % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
    monthName() {
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
      const date = dayjs(this.selectedSession.date)
      return monthNames[date.month()]
    },
    sessionCoaches() {
      // eslint-disable-next-line no-underscore-dangle
      return this.users.filter((user) => this.selectedSession.coaches.some(seshCoach => user._id === seshCoach))
    },
    coachText() {
      return this.sessionCoaches.length < 1 ? 'No Coaches Assigned' : `${this.sessionCoaches.length} Coach${this.sessionCoaches.length > 1 ? 'es' : ''} Assigned`
    }
  },
};
</script>

<style scoped>
  .subbutton {
    text-transform: none;
  }
</style>