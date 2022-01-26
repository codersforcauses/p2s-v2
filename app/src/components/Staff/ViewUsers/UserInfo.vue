<template>
  <v-card flat tile height="100%" class="py-sm-12">
    <v-card-text height="100%" class="pa-0">
      <div class="ml-4 mt-sm-4 d-flex">
        <v-sheet
          v-if="$vuetify.breakpoint.smAndUp"
          outlined
          rounded
          elevation="0"
          class="d-flex align-center grey--text text-h3 px-2"
          :class="$vuetify.theme.dark ? 'text--lighten-1' : 'text--darken-1'"
        >
          {{getInitials}}
        </v-sheet>
        <v-list-item three-line class="px-2 px-sm-4">
          <v-list-item-content class="py-0">
            <v-list-item-title class="text-h6">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <a :href="'mailto:' + user.email">{{user.email}}</a>
            </v-list-item-subtitle>
            <v-list-item-subtitle >
              <a :href="'tel:' + user.mobile">{{user.mobile}}</a>
            </v-list-item-subtitle>
            <div>
              <v-icon v-if="user.coach.is" title="Coach" color="primary">mdi-football-australian</v-icon>
              <v-icon v-if="user.admin.is" title="Administrator" color="primary">mdi-shield-account</v-icon>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>

      <FeathersVuexFind
        v-slot="{ items: sessions }"
        service="sessions"
        :params="{ query }"
        watch="params"
      >
      <v-card v-if="user.coach.is" outlined rounded="lg" flat class="mx-4 my-6">
        <v-card-text class="pb-0">Sessions</v-card-text>
        <v-list-item v-for="session in sessions" :key="session._id" two-line >
          <!-- <v-list-item-content>
            <v-list-item-title>Name: {{getEmergencyInfo.name}}</v-list-item-title>
            <v-list-item-subtitle>Num: {{getEmergencyInfo.num}}</v-list-item-subtitle>
          </v-list-item-content> -->
          <pre>{{JSON.stringify(session, null, 2)}}</pre>
        </v-list-item>
        <v-card-text v-if="!sessions.length">No Sessions Found</v-card-text>
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
      <pre>{{JSON.stringify(user, null, 2)}}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
  computed: {
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
    query() {
      return {
        _id: this.user.id
      }
    },
  },
};
</script>

<style scoped>
.coach-docs {
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.75rem;
}
.wwc {
  grid-column: 1 / span 2;
}

@media only screen and (min-width: 960px) {
  .coach-docs {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
  }
  .wwc {
    grid-column: 1;
  }
}
</style>
