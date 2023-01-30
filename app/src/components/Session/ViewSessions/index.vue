<template>
  <v-sheet rounded="xl" class="overflow-hidden">
    <SessionFilter @setTab="setTab" />
    <SessionList  v-model="selectedSession" @selected="setSession" :sessions="sessions" :isPending="isFindSessionsPending" @close="closeDrawer" />
    <InfoPanel v-model="drawer">
      <template v-slot:content>
        <SessionInfo v-if="selectedSession" :session="selectedSession" @close="closeDrawer" />
      </template>
      <template v-slot:actions v-if="selectedSession">
        <v-btn color="primary" outlined rounded @click="editSessionDialog = true"><v-icon>mdi-pencil</v-icon>Edit Session</v-btn>
        <SessionDialog v-model="editSessionDialog" :sessionId="selectedSession._id" />
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-2" outlined rounded @click="deleteSessionDialog = true"><v-icon>mdi-trash-can</v-icon>Delete Session</v-btn>
        <DeleteDialog v-model="deleteSessionDialog" :session="selectedSession" />
      </template>
    </InfoPanel>
  </v-sheet>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import SessionFilter from './SessionFilter';
import SessionList from './SessionList';
import DeleteDialog from './DeleteDialog';
import SessionInfo from '../SessionInfo';
import SessionDialog from '../SessionDialog';
import InfoPanel from "../../other/InfoPanel.vue";

export default {
  name: 'view-sessions',
  title: 'View Sessions',
  mixins: [ makeFindMixin({ service: 'sessions', watch: true })],
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
      editSessionDialog: false,
      deleteSessionDialog: false,
      selectedTab: 0
    };
  },
  computed: {
    sessionsParams() {
      return { query: {
        $sort: {
          date: this.selectedTab === 0 ? 1 : -1,
        },
        date: {
          [this.selectedTab === 0 ? '$gte' : '$lt']: new Date().toISOString()
        }
      }}
    }
  },
  methods: {
    closeDrawer() {
      this.drawer = false
    },
    setSession(session) {
      this.selectedSession = session;
      if(session) {
        this.drawer = true;
      }
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
