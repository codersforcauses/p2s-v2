<template>
  <v-card flat tile class="py-sm-12">
    <v-card-text height="100%" class="pa-0 mt-sm-4">
      <div v-if="session" class="d-flex">
        <DateView :date="session.date" />
        <v-divider
        inset vertical
        class="pl-7"
        />
        <FeathersVuexGet 
            v-slot="{ item: school }"
            service="schools"
            :id="session.school"  
          >
          <div class="d-flex flex-column justify-space-between pl-7">
            <div class="text-subtitle-1">{{ formatTime }} - {{ school ? school.name : 'loading' }}</div>
            <div>{{ session.type }}</div>
            <div>{{ coachText }}</div>
          </div>
        </FeathersVuexGet>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
import DateView from './DateView.vue'
import dateUtils from '../../utils/date'

export default {
  mixins: [dateUtils],
  components: {
    DateView
  },
  props: {
    session: Object
  },
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
    currentYear() {
      return dayjs().year()
    },
    date() {
      return this.session.date
    },
    coachText() {
      if(!this.session.coaches || this.session.coaches.length < 1) return 'No Coaches Assigned'
      return `${this.session.coaches.length} Coach${this.session.coaches.length > 1 ? 'es' : ''} Assigned`
    },
  }
};
</script>
