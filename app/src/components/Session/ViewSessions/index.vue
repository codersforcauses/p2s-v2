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
        <SessionList  v-model="selectedSession" @selected="setSession" :sessions="sessions" :isPending="isPending" @close="closeDrawer" />
        <info-panel v-model="drawer">
          <SessionInfo v-if="selectedSession" :session="selectedSession" @close="closeDrawer" />
          <v-card-actions v-if="selectedSession">
            <v-btn color="primary" text rounded :to="{ path: `/session/${selectedSession._id}`}">View Session</v-btn>
            <v-btn color="primary" text rounded @click="editSessionDialog = true">Edit Session</v-btn>
            <SessionDialog v-model="editSessionDialog" :sessionId="selectedSession._id" />
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
import SessionDialog from '../SessionDialog';
import InfoPanel from "../../other/InfoPanel.vue";

export default {
  name: 'view-sessions',
  title: 'View Sessions',
  components: {
    SessionInfo,
    SessionFilter,
    SessionList,
    InfoPanel,
    SessionDialog
  },
  data() {
    return {
      selectedSession: null,
      drawer: false,
      listLimit: 10,
      listSkip: 0,
      editSessionDialog: false,
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
    closeDrawer() {
      this.drawer = false
    },
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
  },
  watch: {
    selectedSession() {
      if(!this.selectedSession) this.drawer = false
    },
    selectedTab() {
      this.listSkip = 0;
    },
    drawer() {
      if(!this.drawer) {
        setTimeout(() => {
          this.selectedSession = null;
        }, 50)
      }
    }
  }
};
</script>
