<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: sessions, isFindPending: isPending }"
      service="sessions"
      :params="{ query }"
      watch="params"
    >
      <div>
        <session-info :session="sessions[selected]" />
        <v-skeleton-loader type="list-item-two-line@10" :loading="isPending">
          <v-list two-line subheader>
              <v-list-item @click="drawer = false; sessionDialog = true">
                <v-icon color="primary">mdi-plus</v-icon>
                <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add Session</v-list-item-subtitle>
                <add-session v-model="sessionDialog" />
              </v-list-item>
            <v-list-item-group v-model="selected" mandatory color="primary">
              <template v-for="session in sessions">
                <v-list-item :key="session._id" @click="drawer = true">
                  <v-list-item-content>
                    <v-list-item-title class="text--primary">{{`${dayNum(session)}${dayOrdinal(session)} ${monthName(session)} - ${session.location}`}}</v-list-item-title>
                    <v-list-item-subtitle>{{`${formatTime(session)}, ${session.type}`}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-skeleton-loader>
        <v-navigation-drawer
          v-model="drawer"
          v-if="$vuetify.breakpoint.smAndUp"
          width="50%"
          mobile-breakpoint="xs"
          fixed
          clipped
          right
          disable-resize-watcher
          disable-route-watcher
          class="py-3 px-0"
          
        >
          <template #default>
            <div>student stuff</div>
          </template>
        </v-navigation-drawer>
        <v-bottom-sheet v-else v-model="drawer" scrollable>
          <v-sheet class="rounded-t-xl pt-6">
            <template #default>
              <div>student stuff</div>
            </template>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import dayjs from 'dayjs'

import SessionInfo from '../ViewSessions/SessionInfo';

export default {
  name: 'view staff',
  title: 'View Staff',
  components: {
    SessionInfo
  },
  data() {
    return {
      selected: 0,
      drawer: false,
      limit: 10,
      skip: 0,
      sessionDialog: false,
      selectedTab: 0
    };
  },
  computed: {
    query() {
      return {
        $limit: this.limit,
        $skip: this.skip,
        $sort: {
          date: 1,
        },
        _id: this.$route.params.id
      }
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
  }
};
</script>
