<template>
  <Card title="Sessions">
    <template v-slot:content>
      <v-card flat>
        <v-tabs v-model="selectedTab" class="mb-2">
          <v-tab class="text-capitalize text-body-2">Next Session</v-tab>
          <v-tab class="text-capitalize text-body-2">Last Session</v-tab>
        </v-tabs>
        <div v-if="session">
          <div class="d-flex pb-2">
            <DateView :date="session.date" />
            <v-divider inset vertical class="mx-5" />
            <FeathersVuexGet v-slot="{ item: school }" service="schools" :id="session.school">
              <div class="d-flex flex-column justify-space-between">
                <div class="text-subtitle-1">{{ formatTime(session) }} - {{ school? school.name : 'loading' }}</div>
                <div>{{ session.type }}</div>
                <div>{{ coachText(session) }}</div>
              </div>
            </FeathersVuexGet>
          </div>
          <v-btn width="100%" outlined rounded color="primary" :to="{ path: `/session/${session._id}` }">
            View Session
          </v-btn>
        </div>
        <div v-else class="text-body">
          No {{ selectedTab === 0 ? "upcoming" : "previous" }} sessions found
        </div>
      </v-card>
    </template>
    <template v-slot:actions>
      <v-btn text rounded color="primary" :to="{ name: 'view-sessions' }">View All</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="adminUser" text rounded color="primary" @click="sessionDialog = true">
        <v-icon left>
          mdi-plus
        </v-icon>
        Create New</v-btn>
      <SessionDialog v-if="adminUser" v-model="sessionDialog" />
    </template>
  </Card>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import Card from '../../layout/Card.vue'
import SessionDialog from '../SessionDialog'
import DateView from '../DateView.vue'
import userRoleMixin from '../../../utils/userRole.mixin';

dayjs.extend(utc)

export default {
  mixins: [makeFindMixin({ service: 'sessions', watch: true }), userRoleMixin],
  components: {
    Card,
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
