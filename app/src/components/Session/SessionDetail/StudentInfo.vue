<template>
  <v-card v-if="student" flat tile height="100%" class="py-sm-12">
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
          <v-list-item-title class="text-h6">{{ student.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-h6">Year {{ student.schoolYear }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>


    <v-card v-if="student.contact.home" outlined rounded="lg" flat class="mx-4 my-6">
      <v-card-text class="pb-0">Home Contact</v-card-text>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{student.contact.home.name}}</v-list-item-title>
          <v-list-item-subtitle>Mobile: {{student.contact.home.mobileNumber}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card v-else outlined rounded="lg" flat class="mx-4 my-6">
      <v-card-text class="pb-0">Home Contact</v-card-text>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>No contact provided</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card v-if="student.contact.emergency" outlined rounded="lg" flat class="mx-4 my-6">
      <v-card-text class="pb-0">Emergency Contact</v-card-text>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{student.contact.emergency.name}}</v-list-item-title>
          <v-list-item-subtitle v-if="student.contact.emergency.mobileNumber">Mobile: {{student.contact.emergency.mobileNumber}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card v-else outlined rounded="lg" flat class="mx-4 my-6">
      <v-card-text class="pb-0">Emergency Contact</v-card-text>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>No contact provided</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  computed: {
    getInitials() {
      if (this.student) {
        const nameArr = this.student.name.split(' ')
        const firstNameChar = nameArr[0].charAt(0)
        if(nameArr.length > 1) {
          const lastNameChar = nameArr[1].charAt(0)
          return firstNameChar + lastNameChar
        }
        return firstNameChar
      }
      return ''
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
    },
  },
};
</script>
