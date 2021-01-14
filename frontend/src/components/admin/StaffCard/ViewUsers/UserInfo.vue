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
            <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{user.mobile}}</v-list-item-subtitle>
            <div>
              <v-icon v-if="user.coach.is" title="Coach" color="primary">mdi-football-australian</v-icon>
              <v-icon v-if="user.admin.is" title="Administrator" color="primary">mdi-shield-account</v-icon>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-card v-if="user.emergencyContact" outlined rounded="lg" flat class="mx-4 my-6">
        <v-card-text class="pb-0">Emergency Contact</v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name: {{getEmergencyInfo.name}}</v-list-item-title>
            <v-list-item-subtitle>Num: {{getEmergencyInfo.num}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <div class="coach">
        <div class="coach-docs text-caption text--secondary">
          <div class="wwc">
            WWC
            <v-skeleton-loader tile type="image" height="128" class="rounded-lg">
              <!-- <img src="src" alt="alt"> -->
            </v-skeleton-loader>
          </div>
          <div>
            Police Clearance
            <v-skeleton-loader tile type="image" height="128" class="rounded-lg">
              <!-- <img src="src" alt="alt"> -->
            </v-skeleton-loader>
          </div>
          <div>
            Medical Clearance
            <v-skeleton-loader tile type="image" height="128" class="rounded-lg">
              <!-- <img src="src" alt="alt"> -->
            </v-skeleton-loader>
          </div>
        </div>
        <!-- <pre>{{JSON.stringify(user, null, 2)}}</pre> -->
      </div>
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
      const lastNameChar = nameArr[1].charAt(0)
      return firstNameChar + lastNameChar
    },
    getEmergencyInfo() {
      const name = this.user?.emergencyContact?.name ?? 'Michael Moore'
      const num = this.user?.emergencyContact?.phoneNumber ?? '+61 412345678'
      return {name, num}
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
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
