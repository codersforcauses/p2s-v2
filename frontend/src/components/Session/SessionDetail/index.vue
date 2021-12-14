<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexGet
      v-slot="{ item: session, isFindPending: isPending }"
      service="sessions"
      :id="id"
      :watch="id"
    >
      <div>
        <div v-if="!session || isPending">Loading...</div>
        <div v-else>
          <SessionInfoHeader :session="session"/>
          <FeathersVuexFind
            v-slot="{ items: students }"
            service="students"
            :params="{ query: { _id: { $in: session.students } } }"
            watch="params"
          >
            <FeathersVuexFind
              v-slot="{ items: reports }"
              service="reports"
              :params="{ query: { session: session._id } }"
              watch="params"
            >
            <div>
              <v-divider class="mt-8" />
              <Attendence :session="session" :registeredStudents="students" :reports="reports" @openReport="setReport"/>
              <info-panel v-model="drawer">
                <ReportInfo :report="selectedReport" />
              </info-panel>
            </div>
            </FeathersVuexFind>
          </FeathersVuexFind>
        </div>
      </div>
    </FeathersVuexGet>
  </v-sheet>
</template>

<script>

import Attendence from '../Attendence'
import InfoPanel from '../../other/InfoPanel.vue';
import ReportInfo from './ReportInfo.vue';
import SessionInfoHeader from './SessionInfoHeader.vue';

export default {
  name: 'session-detail',
  title: 'Session Detail',
  components: {
    Attendence,
    InfoPanel,
    ReportInfo,
    SessionInfoHeader,
  },
  data: () => ({
    selectedReport: null,
    drawer: false
  }),
  methods: {
    setReport(report) {
      this.selectedReport = report;
      this.drawer = true;
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
};
</script>
