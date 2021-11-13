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
          <div class="d-flex justify-space-between align-center mx-10">
            <DateView :date="session.date" />
            <v-divider
            inset vertical
            />
            <TimeView :date="session.date" />
            <v-divider
            inset vertical
            />
            <ActivityView :session="session" />
            <v-divider
            inset vertical
            />
            <CoachesView :session="session" />
          </div>
          <FeathersVuexFind
            v-slot="{ items: students }"
            service="students"
            :params="{ query: { $in: session.students } }"
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
              <Attendence :students="students" :reports="reports" @openReport="setReport"/>
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
import DateView from '../DateView.vue'
import TimeView from '../TimeView.vue'
import ActivityView from '../ActivityView.vue';
import CoachesView from '../CoachesView.vue'
import Attendence from '../Attendence.vue'
import InfoPanel from '../../other/InfoPanel.vue';
import ReportInfo from './ReportInfo.vue';

export default {
  name: 'session-detail',
  title: 'Session Detail',
  components: {
    DateView,
    TimeView,
    ActivityView,
    CoachesView,
    Attendence,
    InfoPanel,
    ReportInfo,
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
