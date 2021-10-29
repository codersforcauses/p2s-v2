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
            class="pl-7"
            />
            <TimeView :date="session.date" />
            <v-divider
            inset vertical
            class="pl-7"
            />
            <ActivityView :session="session" />
            <v-divider
            inset vertical
            class="pl-7"
            />
            <CoachesView :session="session" />
          </div>
          <FeathersVuexFind
            v-slot="{ items: students }"
            service="students"
            :params="{ query: { $limit: 200 } }"
            watch="params"
          >
            <Attendence :students="students"/>
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

export default {
  name: 'session-detail',
  title: 'Session Detail',
  components: {
    DateView,
    TimeView,
    ActivityView,
    CoachesView,
    Attendence
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
};
</script>
