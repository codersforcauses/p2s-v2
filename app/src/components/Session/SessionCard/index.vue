<template>
  <v-card flat rounded="xl">
      <v-card flat class="rounded-tl-xl" style="overflow: hidden;">
        <v-tabs v-model="selectedTab" class="mb-2">
          <v-tab class="text-capitalize text-body-2">Next Session</v-tab>
          <v-tab class="text-capitalize text-body-2">Last Session</v-tab>
        </v-tabs>
        <v-container v-if="session">
          <v-row class="mx-3">
            <DateView :date="session.date" />
            <v-divider
            inset vertical
            class="mx-5"
            />
            <FeathersVuexGet 
              v-slot="{ item: school }"
              service="schools"
              :id="session.school"  
            >
              <div class="d-flex flex-column justify-space-between">
                <div class="text-subtitle-1">{{ formatTime(session) }} - {{ school ? school.name : 'loading' }}</div>
                <div>{{ session.type }}</div>
                <div>{{ coachText(session) }}</div>
              </div>
            </FeathersVuexGet>
          </v-row>
        </v-container>
        <div v-else class="text-h6 mb-10 px-4">
          No Session Found
        </div>
        <v-btn v-if="session" text rounded color="primary" :to="{ path: `/session/${session._id}`}">View Session</v-btn>
      </v-card>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Sessions</v-card-title>
    <v-card-text>
      View all the sessions on file
      <br /><span v-if="adminUser">Create a new session to be used in lessons or programs</span>
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" :to="{ name: 'view-sessions' }">View All</v-btn>
      <v-btn v-if="adminUser" text rounded color="primary" @click="sessionDialog = true">Create New</v-btn>
      <SessionDialog v-if="adminUser" v-model="sessionDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import SessionDialog from '../SessionDialog'
import DateView from '../DateView.vue'
import userRoleMixin from '../../../utils/userRole.mixin';

dayjs.extend(utc)

export default {
  mixins: [ makeFindMixin({ service: 'sessions', watch: true }), userRoleMixin],
  components: {
    SessionDialog,
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
    session() {
      return this.sessions[0]
    },
    sessionsParams() {
      return {
        query: this.searchQuery
      }
    },
    searchQuery() {
      const currentDate = dayjs().utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      const query = this.selectedTab === 0 ?
      {
        date: {
          $gte: currentDate
        },
        $sort: {
          date: 1
        }
      } :
       {
        date: {
          $lt: currentDate
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
