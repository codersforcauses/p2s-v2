<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexGet
      v-slot="{ item: session, isFindPending: isPending }"
      service="sessions"
      :id="id"
      :watch="id"
    >
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
            <StudentAttendence v-model="selectedStudent" :session="session" :registeredStudents="students" :reports="reports" :selectedReport="selectedReport" @setReport="setReport" @setStudent="setStudentInfo" @close="closeDrawer" class="pr-3" :style="drawer && !$vuetify.breakpoint.xs ? 'width: 48%;' : ''"/>
            
            <info-panel v-model="drawer">
              <ReportInfo v-if="selectedReport" :report="selectedReport" @close="closeDrawer" />
              <UserInfo v-else-if="selectedUser" :user="selectedUser" @close="closeDrawer" />
              <StudentInfo v-else-if="selectedStudent" :student="selectedStudent" @close="closeDrawer" />
            </info-panel>

          </div>
          </FeathersVuexFind>
        </FeathersVuexFind>
        <FeathersVuexFind
          v-slot="{ items: coaches }"
          service="users"
          :params="{ query: { _id: { $in: session.coaches } } }"
          watch="params"
        >
          <AttendingCoaches v-model="selectedUser" :session="session" :registeredCoaches="coaches" @setSelectedUser="setUserInfo" />
        </FeathersVuexFind>
        <v-card flat class="mx-4 my-6">
          <v-card-title class="pb-0">Feedback</v-card-title>
          <FeathersVuexInputWrapper :item="session" prop="feedback">
            <template #default="{ current, prop, createClone, handler }">
              <v-textarea 
                v-model="current[prop]"
                filled
                rounded
                auto-grow
                no-resize
                @focus="createClone"
                @blur="e => handler(e, save)"></v-textarea>
            </template>
          </FeathersVuexInputWrapper>
        </v-card>
      </div>
    </FeathersVuexGet>
  </v-sheet>
</template>

<script>

import StudentAttendence from '../StudentAttendence'
import InfoPanel from '../../other/InfoPanel.vue';
import ReportInfo from './ReportInfo.vue';
import SessionInfoHeader from './SessionInfoHeader.vue';
import AttendingCoaches from './AttendingCoaches';
import UserInfo from './UserInfo.vue';
import StudentInfo from './StudentInfo.vue';

export default {
  name: 'session-detail',
  title: 'Session Detail',
  components: {
    StudentAttendence,
    InfoPanel,
    ReportInfo,
    SessionInfoHeader,
    AttendingCoaches,
    UserInfo,
    StudentInfo
  },
  data: () => ({
    selectedReport: null,
    selectedUser: null,
    selectedStudent: null,
    drawer: false
  }),
  methods: {
    closeDrawer() {
      this.drawer = false
    },
    setReport(report) {
      this.selectedUser = null
      this.selectedStudent = null;
      this.selectedReport = report;
      this.drawer = true;
    },
    setUserInfo(user) {
      this.selectedReport = null
      this.selectedStudent = null;
      this.selectedUser = user;
      this.drawer = true;
    },
    setStudentInfo(student) {
      this.selectedReport = null
      this.selectedUser = null;
      this.selectedStudent = student;
      this.drawer = true;
    },
    async save({ clone, data }) {
      const user = clone.commit()
      return user.patch({ data })
    }
  },
  watch: {
    selectedUser() {
      if(!this.selectedUser && !this.selectedStudent && !this.selectedReport) this.drawer = false
    },
    selectedStudent() {
      if(!this.selectedUser && !this.selectedStudent && !this.selectedReport) this.drawer = false
    },
    selectedReport() {
      if(!this.selectedUser && !this.selectedStudent && !this.selectedReport) this.drawer = false
    },
    drawer() {
      if(!this.drawer) {
        setTimeout(() => {
          this.selectedUser = null
          this.selectedStudent = null;
          this.selectedReport = null;
        }, 50)
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
};
</script>
