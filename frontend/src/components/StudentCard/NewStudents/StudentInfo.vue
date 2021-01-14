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
            <v-list-item-title class="text-h6">{{`${user.name.first} ${user.name.last}`}}</v-list-item-title>
            <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{user.mobile}}</v-list-item-subtitle>
            <div>
              <v-icon v-if="user.coach.is" title="Coach" color="primary">mdi-football-australian</v-icon>
              <v-icon v-if="user.admin.is" title="Administrator" color="primary">mdi-shield-account</v-icon>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-card outlined rounded="lg" flat class="mx-4 my-6">
        <v-card-text class="pb-0">Emergency Contact</v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name: {{getEmergencyInfo.name}}</v-list-item-title>
            <v-list-item-subtitle>Num: {{getEmergencyInfo.num}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
        <!-- <pre>{{JSON.stringify(user, null, 2)}}</pre> -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
    }
  },
  computed: {
    getInitials() {
      const firstNameChar = this.student.name.first.charAt(0)
      const lastNameChar = this.student.name.last.charAt(0)
      return firstNameChar + lastNameChar
    },
    getEmergencyInfo() {
      const name = this.student?.contact?.emergency?.name ?? 'Michael Moore'
      const num = this.student?.contact?.emergency?.mobileNumber ?? '+61 412345678'
      return {name, num}
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
};
</script>
