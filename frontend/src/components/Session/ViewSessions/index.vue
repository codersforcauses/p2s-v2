<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: sessions, isFindPending: isPending, queryInfo: info }"
      service="sessions"
      :params="{ query }"
      watch="params"
    >
      <div>
        <div :style="{ width: $vuetify.breakpoint.smAndUp && drawer ? '50vw' : '100vw'}">
          <div class="d-flex justify-space-between">
            <div>
              <v-tabs v-model="selectedTab">
                <v-tab class="text-capitalize text-body-2">Future Sessions</v-tab>
                <v-tab class="text-capitalize text-body-2">Past Sessions</v-tab>
              </v-tabs>
            </div>
            <div class="d-flex align-center">
              <v-btn icon color="primary" :disabled="skip === 0" @click="skip -= limit">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <span width="20px">Page {{skip/limit+1}}</span>
              <v-btn icon color="primary" :disabled="skip + limit >= info.total" @click="skip += limit">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
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
            <session-info :session="sessions[selected]" />
          </template>
        </v-navigation-drawer>
        <v-bottom-sheet v-else v-model="drawer" scrollable>
          <v-sheet class="rounded-t-xl pt-6">
            <template #default>
              <session-info :session="sessions[selected]" />
            </template>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import dayjs from 'dayjs'

import SessionInfo from './SessionInfo';
import AddSession from '../CreateSession';

export default {
  name: 'view-sessions',
  title: 'View Sessions',
  components: {
    SessionInfo,
    AddSession
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
        date: {
          [this.selectedTab === 0 ? '$gte' : '$lt']: new Date().toISOString()
        }
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
