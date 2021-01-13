<template>
  <FeathersVuexGet v-slot="{ item: session }"
    service="sessions"
    :id="id"
    :watch="id">
    <v-sheet>
      <div class="pb-5">
        <div v-if="session" class="d-flex pt-5">
          <div class="d-flex-row pl-5">
            <div class="d-flex">
              <div class="text-h2 primary--text">{{ dayNum(session) }}</div>
              <div class="text-h5 primary--text">{{ dayOrdinal(session) }}</div>
            </div>
            <div class="text-body-1">{{ monthName(session) }}</div>
          </div>
          <v-divider
          inset vertical
          class="pl-7"
          />
          <div class="d-flex flex-column justify-space-between pl-7" @mouseover="viewOverlay = true" @mouseout="viewOverlay = false">
            <div class="text-subtitle-1">{{ formatTime(session) }} - {{ session.location }}</div>
            <div>{{ session.type }}</div>
            <div>{{ coachText(session) }}</div>
          </div>
        </div>
        <div v-else class="text-h6 pl-4">
          No Session Found
        </div>
      </div>
      <FeathersVuexFind
        v-if="session"
        v-slot="{ items: students, isFindPending: isPending, queryInfo: info }"
        service="students"
        :params="{ 
          query: {
            ...query,
            
          }
        }"
        watch="params"
      >
      <!-- _id: {
              $in: session.students
            } -->
        <div>
          <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
            <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
              <v-btn color="primary" text dense rounded @click="studentDialog = true">Add Student</v-btn>
              <add-students v-model="studentDialog" />
              <v-spacer></v-spacer>
              <v-btn icon color="primary" :disabled="skip === 0" @click="skip -= limit">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <span>Page {{skip/limit+1}}</span>
              <v-btn icon color="primary" :disabled="skip + limit >= info.total" @click="skip += limit">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
          <v-skeleton-loader type="list-item-two-line@10" :loading="isPending" :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
            <v-list v-if="info.total !== 0" two-line >
              <v-list-item-group v-model="selected" mandatory color="primary">
                <template v-for="student in students">
                  <v-list-item :key="student._id" @click="drawer = true">
                    <v-list-item-content>
                      <v-list-item-title class="text--primary">{{ `${student.name.first} ${student.name.last}` }}</v-list-item-title>
                      <v-list-item-subtitle>{{ `Year ${student.schoolYear}` }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-actions>
                      <v-btn color="primary" large icon><v-icon>mdi-text-box-plus</v-icon></v-btn>
                    </v-list-item-actions>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text--primary">No Students Found</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-skeleton-loader>
          <v-navigation-drawer
            v-if="$vuetify.breakpoint.smAndUp"
            width="50%"
            mobile-breakpoint="xs"
            fixed
            clipped
            right
            disable-resize-watcher
            disable-route-watcher
            class="py-3 px-0"
          >
            <template #default>
              <div>{{ students[selected] }}</div>
            </template>
          </v-navigation-drawer>
          <v-bottom-sheet v-else v-model="drawer" fullscreen scrollable>
            <v-sheet class="rounded-t-xl pt-3">
              <template #default>
                <v-btn
                  icon
                  color="primary"
                  @click="drawer = !drawer"
                  class="ml-3"
                  large
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <div>{{ students[selected] }}</div>
              </template>
            </v-sheet>
          </v-bottom-sheet>
        </div>
      </FeathersVuexFind>
    </v-sheet>
  </FeathersVuexGet>
</template>

<script>
import dayjs from 'dayjs'

export default {
  components: {
    addStudents: () => ({
      component: import('./addStudents.vue'),
    }),
  },
  data() {
    return {
      selected: 0,
      drawer: false,
      limit: 10,
      skip: 0,
      studentDialog: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    query() {
      return {
        $limit: this.limit,
        $skip: this.skip,
        $sort: {
          'name.first': 1,
          'name.last': 1,
        }
      }
    }
  },
  methods: {
    formatTime(session) {
      return dayjs(session.date).format('h:mma')
    },
    dayNum(session) {
      return dayjs(session.date).date()
    },
    dayOrdinal(session) {
      if (this.dayNum(session) > 3 && this.dayNum(session) < 21) return 'th';
      switch (this.dayNum(session) % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
    monthName(session) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const date = dayjs(session.date)
      return monthNames[date.month()]
    },
    coachText(session) {
      return session.coaches.length < 1 ? 'No Coaches Assigned' : `${session.coaches.length} Coach${session.coaches.length > 1 ? 'es' : ''} Assigned`
    },
  }
}
</script>

<style>

</style>