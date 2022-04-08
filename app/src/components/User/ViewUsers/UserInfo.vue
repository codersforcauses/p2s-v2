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
      <div class="d-flex" style="gap: 10px;">
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
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-cake-variant</v-icon>
            {{ formattedDOB }}
          </v-card-text>
        </v-col>
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-human-non-binary</v-icon>
            {{ user.gender }}
          </v-card-text>
        </v-col>
        <v-col cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-map-marker</v-icon>
            {{ formatteAddress }}
          </v-card-text>
        </v-col>
        <v-col cols="12">
          <v-card-title class="primary--text subtitle-1"> Culture: </v-card-title>
          <v-card-text class="subtitle-2">
            {{ user.culture }}
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
        <v-card flat>
          <v-list rounded dense>
            <v-subheader>Sessions</v-subheader>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                two-line
                v-for="(session, i) in sessions"
                :key="i"
                class="d-flex"
                :to="{ path: `/session/${session._id}`}"
              >
                <v-list-item-icon>
                  <DateView :date="session.date" />
                </v-list-item-icon>
                <v-list-item-content>
                  <FeathersVuexGet 
                    v-slot="{ item: school }"
                    service="schools"
                    :id="session.school"  
                  >
                      <v-list-item-title>{{ school ? school.name : 'loading' }}</v-list-item-title>
                  </FeathersVuexGet>
                  <v-list-item-subtitle>{{ session.type }} {{ session.location ? ` - ${session.location}` : ''}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </FeathersVuexFind>

      <v-card  outlined rounded="lg" flat class="mx-4 my-6">
        <v-card-text class="pb-0">Emergency Contact</v-card-text>
        <v-list-item v-if="user.emergencyContact" two-line>
          <v-list-item-content>
            <v-list-item-title>Name: {{getEmergencyInfo.name}}</v-list-item-title>
            <v-list-item-subtitle>Num: {{getEmergencyInfo.num}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>No contact provided</v-card-text>
      </v-card>  
      

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
import dateUtils from '../../../utils/date'
import DateView from './DateView.vue';

export default {
  components: { DateView },
  props: {
    user: {
      type: Object,
      default: () => ({
        name: '',
        email: '',
        mobile: '',
        emergencyContact: {
          name: '',
          phoneNumber: '',
        },
        coach: {
          is: false,
        },
        admin: {
          is: false
        }
      })
    }
  },
  mixins: [dateUtils],
  computed: {
    formattedDOB() {
      return dayjs(this.user.DOB).format('DD MMMM YYYY');
    },
    formatteAddress() {
      return `${this.user.address.street}, ${this.user.address.suburb}, ${this.user.address.state}, ${this.user.address.postcode}`;
    },
    getInitials() {
      const nameArr = this.user.name.split(' ')
        const firstNameChar = nameArr[0].charAt(0)
      if(nameArr > 1) {
        const lastNameChar = nameArr[1]?.charAt(0)
        return firstNameChar + lastNameChar
      }
      return firstNameChar
    },
    getEmergencyInfo() {
      const name = this.user?.emergencyContact?.name ?? 'Michael Moore'
      const num = this.user?.emergencyContact?.phoneNumber ?? '+61 412345678'
      return {name, num}
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
    sessionQuery() {
      return {
        coaches: this.user._id
      }
    },
  },
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

