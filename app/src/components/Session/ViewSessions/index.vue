<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: sessions, isFindPending: isPending, queryInfo: info }"
      service="sessions"
      :params="{ query }"
      watch="params"
    >
      <div>
        <SessionFilter :skip="listSkip" @setSkip="setSkip" :limit="listLimit" @setTab="setTab" :queryInfo="info"/>
        <SessionList :sessions="sessions" @selected="setSession" :isPending="isPending" @open="drawer = true" />
        <info-panel v-model="drawer">
          <session-info v-if="selectedSession" :session="selectedSession" />
          <v-card-actions v-if="selectedSession">
            <v-btn color="primary" text rounded :to="{ path: `/session/${selectedSession._id}`}">View Session</v-btn>
          </v-card-actions>
          <div v-else class="text-h6 pl-4">
            No Session Selected
          </div>
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import SessionFilter from './SessionFilter';
import SessionList from './SessionList';
import SessionInfo from '../SessionInfo';
import InfoPanel from "../../other/InfoPanel.vue";

export default {
  name: 'view-sessions',
  title: 'View Sessions',
  components: {
    SessionInfo,
    SessionFilter,
    SessionList,
    InfoPanel,
  },
  data() {
    return {
      selectedSession: null,
      drawer: false,
      listLimit: 10,
      listSkip: 0,
      sessionDialog: false,
      selectedTab: 0
    };
  },
  computed: {
    query() {
      return {
        $limit: this.listLimit,
        $skip: this.listSkip,
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
    setSkip(skip) {
      this.listSkip = skip
    },
    setSession(session) {
      this.selectedSession = session;
      this.drawer = true;
    },
    setTab(tab) {
      this.selectedTab = tab
    }
  }
};
</script>
