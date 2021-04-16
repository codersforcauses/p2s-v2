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
            <v-list-item-subtitle>{{user}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-card v-if="student.emergencyContact" outlined rounded="lg" flat class="mx-4 my-6">
        <v-card-text class="pb-0">Emergency Contact</v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name: {{getEmergencyInfo.name}}</v-list-item-title>
            <v-list-item-subtitle>Num: {{getEmergencyInfo.num}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getInitials() {
      const nameArr = this.student.name.split(' ')
        const firstNameChar = nameArr[0].charAt(0)
      if(nameArr > 1) {
        const lastNameChar = nameArr[1]?.charAt(0)
        return firstNameChar + lastNameChar
      }
      return firstNameChar
    },
    getEmergencyInfo() {
      const name = this.student?.emergencyContact?.name ?? 'Michael Moore'
      const num = this.student?.emergencyContact?.phoneNumber ?? '+61 412345678'
      return {name, num}
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
};
</script>
