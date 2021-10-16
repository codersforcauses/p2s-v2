<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexGet
      v-slot="{ items: session, isFindPending: isPending }"
      service="sessions"
      :id="id"
      :watch="id"
    >
      <div>
    {{ session }}
        <div v-if="isPending">Loading...</div>
        <session-info :session="session" />
        <info-panel :open="drawer">
          <div>Student Stuff goes here</div>
        </info-panel>
      </div>
      </FeathersVuexGet>
  </v-sheet>
</template>

<script>

import SessionInfo from '../SessionInfo';
import InfoPanel from '../../other/InfoPanel';

export default {
  name: 'session-detail',
  title: 'Session Detail',
  components: {
    SessionInfo,
    InfoPanel
  },
  props: {
    session: Object
  },
  data: () => ({
      drawer: true,
  }),
  computed: {
    id() {
      return this.$route.params.id
    }
  },
};
</script>
