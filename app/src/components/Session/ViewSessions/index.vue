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
            <v-btn color="primary" outlined rounded @click="editSessionDialog = true"><v-icon>mdi-pencil</v-icon>Edit Session</v-btn>
            <SessionDialog v-model="editSessionDialog" :sessionId="selectedSession._id" />
            <v-spacer></v-spacer>
            <v-btn color="error" class="mr-2" outlined rounded @click="deleteSessionDialog = true"><v-icon>mdi-trash-can</v-icon>Delete Session</v-btn>
            <DeleteDialog v-model="deleteSessionDialog" :session="selectedSession" />
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
import DeleteDialog from './DeleteDialog';
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
    SessionDialog,
    DeleteDialog
  },
  data() {
    return {
      selectedSession: null,
      drawer: false,
      listLimit: 10,
      listSkip: 0,
      editSessionDialog: false,
      deleteSessionDialog: false,
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
      if(!this.selectedSession) {
        this.deleteSessionDialog = false
        this.editSessionDialog = false
        this.drawer = false
      }
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
