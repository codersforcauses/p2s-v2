<template>
  <v-card flat rounded="xl">
    <FeathersVuexFind v-slot="{ items: [session] }" service="sessions" :params="{ query: searchQuery }" watch="params">
      <v-card flat class="rounded-tl-xl" style="overflow: hidden;">
        <v-tabs v-model="selectedTab" class="mb-2">
          <v-tab class="text-capitalize text-body-2">Next Session</v-tab>
          <v-tab class="text-capitalize text-body-2">Last Session</v-tab>
        </v-tabs>
        <div v-if="session" class="d-flex justify-space-around align-center">
          <DateView :date="session.date" />
          <v-divider
          inset vertical
          class="pl-7"
          />
          <div class="d-flex flex-column justify-space-between">
            <div class="text-subtitle-1">{{ formatTime(session) }} - {{ session.location }}</div>
            <div>{{ session.type }}</div>
            <div>{{ coachText(session) }}</div>
          </div>
            <v-btn rounded outlined fab color="primary" class="align-center" :to="{ path: `/session/${session._id}`}"><v-icon>mdi-text-box-multiple-outline</v-icon></v-btn>
        </div>
        <div v-else class="text-h6 mb-10">
          No Session Found
        </div>
      </v-card>
    </FeathersVuexFind>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Sessions</v-card-title>
    <v-card-text>
      View all the sessions on file
      <br /><span v-if="isAdminView">Create a new session to be used in lessons or programs</span>
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" :to="{ name: 'view sessions' }">View All</v-btn>
      <v-btn v-if="isAdminView" text rounded color="primary" @click="sessionDialog = true">Create New</v-btn>
      <NewSession v-if="isAdminView" v-model="sessionDialog" @created="this.$router.push({ path: `/session/${res._id}` })" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import dayjs from 'dayjs'

import NewSession from '../CreateSession.vue'
import DateView from '../DateView.vue'

export default {
  components: {
    NewSession,
    DateView
  },
  data() {
    return {
      selectedTab: 0,
      viewOverlay: false,
      sessionDialog: false,
    };
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
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
    isAdminView() {
      return this.user?.admin?.is;
    },
  },
  methods: {
    formatTime(session) {
      return dayjs(session.date).format('h:mma')
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
