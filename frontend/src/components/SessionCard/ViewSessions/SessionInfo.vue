<template>
  <v-card flat tile height="100%" class="py-sm-12">
    <v-card-text height="100%" class="pa-0 mt-sm-4">
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
      <div class="d-flex flex-column justify-space-between pl-7">
        <div class="text-subtitle-1">{{ formatTime(session) }} - {{ session.location }}</div>
        <div>{{ session.type }}</div>
        <div>{{ coachText(session) }}</div>
      </div>
    </div>
    <div v-else class="text-h6 pl-4">
      No Session Found
    </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text rounded :to="{ path: `/session/${session._id}`}">View Session</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    session: {
      type: Object,
      default: () => ({
      })
    }
  },
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
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
      if(!session.coaches || session.coaches.length < 1) return 'No CoachesAssigned'
      return `${session.coaches.length} Coach${session.coaches.length > 1 ? 'es' : ''} Assigned`
    },
  }
};
</script>
