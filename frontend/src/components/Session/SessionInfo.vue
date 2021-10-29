<template>
  <v-card flat tile class="py-sm-12">
    <v-card-text height="100%" class="pa-0 mt-sm-4">
      <div v-if="session" class="d-flex">
        <DateView :date="session.date" />
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
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
import DateView from './DateView.vue'

export default {
  components: {
    DateView
  },
  props: {
    session: {
      type: Object,
      default: null
    }
  },
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
    currentYear() {
      return dayjs().year()
    },
    dateYear() {
      return this.dayjsDate.year()
    }
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
      if(!session.coaches || session.coaches.length < 1) return 'No Coaches Assigned'
      return `${session.coaches.length} Coach${session.coaches.length > 1 ? 'es' : ''} Assigned`
    },
  }
};
</script>
