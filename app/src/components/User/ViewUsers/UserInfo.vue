<template>
  <v-card v-if="user" flat tile height="100%" class="py-sm-12">
    <v-card outlined class="pt-8 pb-3 d-flex flex-column align-center text-center rounded-b-xl">
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
        <v-card-text class="text-h7 d-flex flex-column">
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

    <FeathersVuexFind
      v-slot="{ items: sessions }"
      service="sessions"
      :params="{ query: sessionQuery }"
      watch="params"
    >
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
                  <FeathersVuexGet v-slot="{ item: school }" service="schools" :id="session.school">
                    <v-list-item-title>{{ school ? school.name : 'loading' }}</v-list-item-title>
                  </FeathersVuexGet>
                  <v-list-item-subtitle
                    >{{ session.type }}
                    {{ session.location ? ` - ${session.location}` : '' }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </v-container>
    </FeathersVuexFind>

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
      <template v-if="user.qualifications">
        <v-row>
          <v-card-title class="subtitle-1">Police Clearance</v-card-title>
        </v-row>
        <v-row v-if="Object.keys(user.qualifications.policeClearance).length > 0">
          <v-col sm="6" cols="12">
            <v-card-text v-if="user.qualifications.policeClearance.verified">
              <v-icon color="primary">mdi-eye-check</v-icon>Verified
            </v-card-text>
            <v-card-text v-else>
              <v-icon color="primary">mdi-eye-remove</v-icon>Not Verified
            </v-card-text>
          </v-col>
          <v-col sm="6" cols="12">
            <v-card-text v-if="user.qualifications.policeClearance.expiry">
              <v-icon color="primary">mdi-calendar-refresh</v-icon>
              {{ Date() | formatExpiry }}
            </v-card-text>
            <v-card-text v-else>
              <v-icon color="primary">mdi-calendar-question</v-icon>
              Expiry Unknown
            </v-card-text>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col sm="6" cols="12">
            <v-card-text>
              <v-icon color="primary">mdi-close</v-icon>
              Not Qualified
            </v-card-text>
          </v-col>
        </v-row>
      </template>
      <v-row v-else>
        <v-col>
          <v-card-text class="subtitle-2 grey--text">
            No Qualifications
          </v-card-text>
        </v-col>
      </v-row>

    </v-container>

    <v-container>
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header> Raw Info </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-subtitle class="subtitle-2 grey--text">
              <pre>{{ JSON.stringify(user, null, 2) }}</pre>
            </v-card-subtitle>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';
import DateView from './DateView.vue';

export default {
  components: { DateView },
  props: {
    user: Object,
  },
  computed: {
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
    sessionQuery() {
      return {
        coaches: this.user._id,
      };
    },
  },
  filters: {
    formatExpiry: (value) => {
      if (!value) return ''
      return dayjs(value).format('DD/MM/YY');
    }
  }
};
</script>

<style scoped>
.v-card__text,
.v-card__title,
.v-card__subtitle {
  padding: 0;
}

.v-icon {
  margin-right: 5px;
}

.col-12 {
  padding: 5px 0;
}

.row {
  padding: 4px;
}

.container {
  padding: 20px 40px;
}
</style>
