<template>
  <v-card v-if="user" flat tile height="100%" class="py-sm-12">
    <v-card flat class="pt-8 pb-3 d-flex flex-column align-center text-center rounded-b-xl">
      <!-- <v-sheet
          outlined
          rounded
          elevation="0"
          width="70px"
          height="70px"
          class="d-flex justify-center align-center grey--text text-h4 mb-3"
          :class="$vuetify.theme.dark ? 'text--lighten-1' : 'text--darken-1'"
        >
          {{getInitials}}
        </v-sheet> -->
      <v-card-title class="text-h5 pt-0 pb-2" style="word-break: keep-all">{{
        user.name
      }}</v-card-title>
      <div class="d-flex" style="gap: 10px">
        <v-card-text v-if="user.coach.is" class="text-h7 d-flex flex-column">
          <v-icon title="Coach" color="primary">mdi-account-heart</v-icon> Coach
        </v-card-text>
        <v-card-text v-if="user.admin.is" class="text-h7 d-flex flex-column">
          <v-icon title="Administrator" color="primary">mdi-shield-account</v-icon> Admin
        </v-card-text>
      </div>
      <v-card-text class="subtitle-1 pa-0">
        <v-icon color="primary">mdi-at</v-icon>
        <a :href="'mailto:' + user.email">{{ user.email }}</a>
      </v-card-text>
      <v-card-text v-if="user.mobile" class="subtitle-1 pa-0">
        <v-icon color="primary">mdi-cellphone</v-icon>
        <a :href="'tel:' + user.mobile">{{ user.mobile }}</a>
      </v-card-text>
    </v-card>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6">Personal</v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="formattedDOB" sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-cake-variant</v-icon>
            {{ formattedDOB }}
          </v-card-text>
        </v-col>
        <v-col v-if="user.gender" sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-human-non-binary</v-icon>
            {{ user.gender }}
          </v-card-text>
        </v-col>
        <v-col v-if="user.culture" sm="6" cols="12">
          <v-card-text class="subtitle-2">
            <v-icon color="primary">mdi-earth</v-icon>
            {{ user.culture }}
          </v-card-text>
        </v-col>
        <v-col v-if="formattedAddress" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-map-marker</v-icon>
            {{ formattedAddress }}
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-text v-if="!hasPersonalInfo" class="subtitle-2 grey--text">
            No Information
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6">Sessions</v-card-title>
        </v-col>
        <v-col>
          <v-card-text v-if="!sessions || sessions.length === 0" class="subtitle-2 grey--text">
            No Sessions Assigned
          </v-card-text>
        </v-col>
      </v-row>
        <v-list rounded dense>
          <v-list-item-group color="primary">
            <v-list-item
              two-line
              v-for="(session, i) in sessions"
              :key="i"
              class="d-flex"
              :to="{ path: `/session/${session._id}` }"
            >
              <v-list-item-icon>
                <DateView :date="session.date" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ isFindSchoolsPending ? 'loading' : getSchool(session.school).name }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ session.type }}
                  {{ session.location ? ` - ${session.location}` : '' }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6">Emergency Contact</v-card-title>
        </v-col>
      </v-row>
      <v-row v-if="user.emergencyContact">
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-account</v-icon>
            {{ user.emergencyContact.name }}
          </v-card-text>
        </v-col>
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-cellphone</v-icon>
            <a :href="'tel:' + user.emergencyContact.phoneNumber">
              {{ user.emergencyContact.phoneNumber }}
            </a>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-card-text class="subtitle-2 grey--text">
            No Information
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6">Qualifications</v-card-title>
        </v-col>
      </v-row>
    </v-container>
    <template v-if="user.qualifications">
      <Clearance
        title="Police Clearance"
        :verified="this.user.qualifications.policeClearance.verified"
        :expiry="this.user.qualifications.policeClearance.expiry"
      />
      <Clearance
        title="Medical Clearance" 
        :verified="this.user.qualifications.medClearance.verified"
        :expiry="this.user.qualifications.medClearance.expiry"
      />
      <Clearance
        title="Working With Children Check" 
        :verified="this.user.qualifications.WWC.verified"
        :expiry="this.user.qualifications.WWC.expiry"
      />
    </template>
    <template v-else>
      <v-container>
        <v-row >
          <v-col sm="6" cols="12">
            <v-card-text>
              <v-icon color="primary">mdi-close</v-icon>
              Not Qualified
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import dayjs from 'dayjs';
import DateView from './DateView.vue';
import Clearance from './Clearance.vue';

export default {
  components: { DateView, Clearance },
  mixins: [ 
    makeFindMixin({ service: 'sessions', watch: true }),
    makeFindMixin({ service: 'schools', watch: true }),
  ],
  props: {
    user: Object,
  },
  computed: {
    schoolsParams() {
      return { query: {
        _id: { $in: this.sessions.map(sesh => sesh.school )}
      }}
    },
    sessionsParams() {
      return { query: {
        coaches: this.user._id,
      }}
    },
    hasPersonalInfo() {
      return (
        !!this.formattedDOB || !!this.formattedAddress || !!this.user.gender || !!this.user.culture
      );
    },
    formattedDOB() {
      if (!this.user.DOB) return null;
      return dayjs(this.user.DOB).format('DD MMMM YYYY');
    },
    formattedAddress() {
      if (!this.user.address) return null;
      return `${this.user.address.street}, ${this.user.address.suburb}, ${this.user.address.state}, ${this.user.address.postcode}`;
    },
    getInitials() {
      const nameArr = this.user.name.split(' ');
      const firstNameChar = nameArr[0].charAt(0);
      if (nameArr > 1) {
        const lastNameChar = nameArr[1]?.charAt(0);
        return firstNameChar + lastNameChar;
      }
      return firstNameChar;
    },
    getEmergencyInfo() {
      const name = this.user?.emergencyContact?.name ?? 'Michael Moore';
      const num = this.user?.emergencyContact?.phoneNumber ?? '+61 412345678';
      return { name, num };
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
  methods: {
    getSchool(id) {
      return this.schools.find(school => school._id === id) ?? {}
    }
  }
};
</script>


