<template>
  <v-skeleton-loader type="list-item-two-line@10" :loading="isPending">
    <v-list two-line subheader>
        <v-list-item @click="openCreateDialog">
          <v-icon color="primary">mdi-plus</v-icon>
          <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add Session</v-list-item-subtitle>
          <CreateSession v-model="sessionDialog" />
        </v-list-item>
      <v-list-item-group v-model="selected" @change="selectSession" mandatory color="primary">
        <template v-for="session in sessions">
          <v-list-item :key="session._id" @click="$emit('open')">
            <v-list-item-content>
              <v-list-item-title class="text--primary">{{`${dayNum(session)}${dayOrdinal(session)} ${monthName(session)}`}}{{session.location ? ` - ${session.location}` : ''}}</v-list-item-title>
              <v-list-item-subtitle>{{`${formatTime(session)}, ${session.type}`}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>
import dayjs from 'dayjs'
import CreateSession from '../CreateSession';

export default {
  name: "session-list",
  title: "Session List",
  components: {
    CreateSession
  },
  props: {
    sessions: Array,
    isPending: Boolean,
  },
  data: () => ({
    selected: 0,
    sessionDialog: false
  }),
  methods: {
    openCreateDialog() {
      this.$emit('selected', null)
      this.sessionDialog = true
    },
    selectSession() {
      this.$emit('selected', this.sessions[this.selected])
    },
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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const date = dayjs(session.date)
      return monthNames[date.month()]
    },
  },
  watch: {
    sessions: {
      deep: true,
      handler() {
        this.selected = null
      }
    }
  }
}
</script>