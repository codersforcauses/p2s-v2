<template>
  <v-sheet rounded="xl" class="py-3">
    {{ this.$route.params.id }}
    {{ this.sessions }}
      <!-- <SessionInfoHeader :session="session" />
      <v-card flat>
        <v-divider class="mt-8" />
        <StudentAttendence
          v-model="selectedStudent"
          :session="session"
          :registeredStudents="students"
          :reports="reports"
          :selectedReport="selectedReport"
          @setReport="setReport"
          @setStudent="setStudentInfo"
          @close="closeDrawer"
          class="pr-3"
          :style="drawer && !$vuetify.breakpoint.xs ? 'width: 48%;' : ''"
        />

        <info-panel v-model="drawer">
          <ReportInfo v-if="selectedReport" :report="selectedReport" @close="closeDrawer" />
          <UserInfo v-else-if="selectedUser" :user="selectedUser" @close="closeDrawer" />
          <StudentInfo
            v-else-if="selectedStudent"
            :student="selectedStudent"
            @close="closeDrawer"
          />
        </info-panel>
      </v-card>
      <AttendingCoaches
        v-model="selectedUser"
        :session="session"
        :registeredCoaches="coaches"
        @setSelectedUser="setUserInfo"
      />
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
              @blur="(e) => handler(e, save)"
            ></v-textarea>
          </template>
        </FeathersVuexInputWrapper>
        <v-card-actions class="px-5">
          <v-btn color="primary" text rounded @click="editSessionDialog = true"
            ><v-icon>mdi-pencil</v-icon>Edit Session</v-btn
          >
          <SessionDialog v-model="editSessionDialog" :sessionId="session._id" />
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-2" text rounded @click="deleteSessionDialog = true"
            ><v-icon>mdi-trash-can</v-icon>Delete Session</v-btn
          >
          <DeleteDialog v-model="deleteSessionDialog" :session="session" />
        </v-card-actions>
      </v-card> -->
  </v-sheet>
</template>

<script>
import { makeFindMixin, makeGetMixin } from 'feathers-vuex';

import StudentAttendence from '../StudentAttendence';
import InfoPanel from '../../other/InfoPanel.vue';
import ReportInfo from './ReportInfo.vue';
import DeleteDialog from '../ViewSessions/DeleteDialog.vue';
import SessionDialog from '../SessionDialog';
import SessionInfoHeader from './SessionInfoHeader.vue';
import AttendingCoaches from './AttendingCoaches';
import UserInfo from './UserInfo.vue';
import StudentInfo from '../../Student/ViewStudents/StudentInfo.vue';

export default {
  name: 'session-detail',
  title: 'Session Detail',
  mixins: [
    makeGetMixin({ service: 'session', id: this?.$route?.params?.id }),
    makeFindMixin({ service: 'sessions' }),
    // makeFindMixin({ service: 'students', watch: true }),
    // makeFindMixin({ service: 'reports', watch: true }),
    // makeFindMixin({ service: 'coaches', watch: true }),
  ],

  components: {
    StudentAttendence,
    InfoPanel,
    ReportInfo,
    SessionInfoHeader,
    AttendingCoaches,
    UserInfo,
    StudentInfo,
    DeleteDialog,
    SessionDialog,
  },
  data: () => ({
    selectedReport: null,
    selectedUser: null,
    selectedStudent: null,
    drawer: false,
    deleteSessionDialog: false,
    editSessionDialog: false,
  }),
  computed: {
    sessionParams() {
      return { query: { _id: this?.$route?.params?.id } };
    },
    sessionsParams() {
      return { query: { _id: this?.$route?.params?.id } };
    },
    studentsParams() {
      return { query: { _id: { $in: this?.session?.students } } };
    },
    reportsParams() {
      return { query: { session: this?.session?._id } };
    },
    coachesParams() {
      return { query: { _id: { $in: this?.session?.coaches } } };
    },
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
    },
    setReport(report) {
      this.selectedUser = null;
      this.selectedStudent = null;
      this.selectedReport = report;
      this.drawer = true;
    },
    setUserInfo(user) {
      this.selectedReport = null;
      this.selectedStudent = null;
      this.selectedUser = user;
      this.drawer = true;
    },
    setStudentInfo(student) {
      this.selectedReport = null;
      this.selectedUser = null;
      this.selectedStudent = student;
      this.drawer = true;
    },
    async save({ clone, data }) {
      const user = clone.commit();
      return user.patch({ data });
    },
  },
  watch: {
    selectedUser() {
      if (!this.selectedUser && !this.selectedStudent && !this.selectedReport) this.drawer = false;
    },
    selectedStudent() {
      if (!this.selectedUser && !this.selectedStudent && !this.selectedReport) this.drawer = false;
    },
    selectedReport() {
      if (!this.selectedUser && !this.selectedStudent && !this.selectedReport) this.drawer = false;
    },
    drawer() {
      if (!this.drawer) {
        setTimeout(() => {
          this.selectedUser = null;
          this.selectedStudent = null;
          this.selectedReport = null;
        }, 50);
      }
    },
  },
};
</script>
