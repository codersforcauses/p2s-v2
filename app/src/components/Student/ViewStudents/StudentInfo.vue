<template>
  <v-card v-if="student" flat tile height="100%" class="py-sm-12">
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
        student.name
      }}</v-card-title>
      
      <FeathersVuexGet v-slot="{ item: school }" service="schools" :id="student.school">
        <v-card-text v-if="school" class="subtitle-1 pa-0">
          <router-link :to="{ path: '/schools/' + school._id }">
            {{ school.name }}
          </router-link>
          &nbsp; | Year {{ student.schoolYear }}
        </v-card-text>
        <v-card-text v-else class="subtitle-1 pa-0">Loading School</v-card-text>
      </FeathersVuexGet>
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
            {{ student.gender }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="student.contact">
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6">Contact</v-card-title>
        </v-col>
      </v-row>
      <v-row v-if="student.contact.home">
        <v-col cols="12">
          <v-card-title class="text-h7">Home</v-card-title>
        </v-col>
      </v-row>
      <v-row v-if="student.contact.home">
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-account</v-icon>
            {{ student.contact.home.name }}
          </v-card-text>
        </v-col>
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-cellphone</v-icon>
            <a :href="'tel:' + student.contact.home.mobileNumber">{{
              student.contact.home.mobileNumber
            }}</a>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row
        v-if="
          student.contact.home && (student.contact.home.email || student.contact.home.homeNumber)
        "
      >
        <v-col sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-at</v-icon>
          <v-card-text v-if="student.contact.home.email">
            <a :href="'mailto:' + student.contact.home.email">{{ student.contact.home.email }}</a>
          </v-card-text>
          <v-card-text v-else class="text--primary"> No Email Provided </v-card-text>
        </v-col>
        <v-col sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-phone</v-icon>
          <v-card-text v-if="student.contact.home.homeNumber">
            <a :href="'tel:' + student.contact.home.homeNumber">{{
              student.contact.home.homeNumber
            }}</a>
          </v-card-text>
          <v-card-text v-else class="text--primary"> No Home Number Provided </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h7">Emergency</v-card-title>
        </v-col>
      </v-row>
      <v-row v-if="student.contact.emergency">
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-account</v-icon>
            {{ student.contact.emergency.name }}
          </v-card-text>
        </v-col>
        <v-col sm="6" cols="12">
          <v-card-text>
            <v-icon color="primary">mdi-cellphone</v-icon>
            <a :href="'tel:' + student.contact.emergency.mobileNumber">{{
              student.contact.emergency.mobileNumber
            }}</a>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-card-title class="text-h7">Consent Form</v-card-title>
      </v-row>
      <v-row>
        <v-card-text v-if="student.consent">
          <v-icon color="primary">mdi-file-document-check</v-icon>
          Received
        </v-card-text>
        <v-card-text v-else>
          <v-icon color="primary">mdi-file-document-remove</v-icon>
          Not received
        </v-card-text>
      </v-row>
    </v-container>

    <v-container v-if="student.medical">
      <v-row>
        <v-card-title class="text-h6">Medical</v-card-title>
      </v-row>

      <v-row class="mb-3" v-if="student.medical.allergies">
        <v-card-title class="primary--text subtitle-1"> Allergies: </v-card-title>
        <v-card-text class="subtitle-2">
          {{ student.medical.allergies }}
        </v-card-text>
      </v-row>

      <v-row class="mb-3" v-if="student.medical.injuries">
        <v-card-title class="primary--text subtitle-1"> Injuries: </v-card-title>
        <v-card-text class="subtitle-2">
          {{ student.medical.injuries }}
        </v-card-text>
      </v-row>

      <v-row class="mb-3" v-if="student.medical.condition">
        <v-card-title class="primary--text subtitle-1"> Condition: </v-card-title>
        <v-card-text class="subtitle-2">
          {{ student.medical.condition }}
        </v-card-text>
      </v-row>

      <v-row class="mb-3" v-if="student.medical.extraInfo">
        <v-card-title class="primary--text subtitle-1"> Other Info: </v-card-title>
        <v-card-text class="subtitle-2">
          {{ student.medical.extraInfo }}
        </v-card-text>
      </v-row>
    </v-container>

    <v-container v-if="hasCulture">
      <v-row>
        <v-card-title class="text-h6">Culture</v-card-title>
      </v-row>

      <v-row class="mb-3" v-if="student.culture">
        <v-card-title class="primary--text subtitle-1"> Culture: </v-card-title>
        <v-card-text class="subtitle-2">
          {{ student.culture }}
        </v-card-text>
      </v-row>

      <v-row v-if="student.birthCountry || student.DOA">
        <v-card-title class="primary--text subtitle-1"> Country of Origin: </v-card-title>
      </v-row>
      <v-row v-if="student.birthCountry || student.DOA">
        <v-col sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-earth</v-icon>
          <v-card-text v-if="student.birthCountry">
            {{ student.birthCountry }}
          </v-card-text>
          <v-card-text v-else class="text--primary"> Unknown </v-card-text>
        </v-col>
        <v-col v-if="student.DOA" sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-airplane-landing</v-icon>
          <v-card-text>
            {{ formattedDOA }}
          </v-card-text>
        </v-col>
      </v-row>

      <v-row v-if="student.language">
        <v-card-title class="primary--text subtitle-1"> Language: </v-card-title>
      </v-row>
      <v-row v-if="student.language">
        <v-col v-if="student.language.englishCompetent" sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-check-circle</v-icon>
          <v-card-text> English Competent </v-card-text>
        </v-col>
        <v-col
          v-else-if="student.language.englishCompetent === undefined"
          sm="6"
          cols="12"
          class="d-flex"
        >
          <v-icon color="primary">mdi-help-circle</v-icon>
          <v-card-text> English Competency Unknown </v-card-text>
        </v-col>
        <v-col v-else sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-close-circle</v-icon>
          <v-card-text> Not English Competent </v-card-text>
        </v-col>
        <v-col v-if="student.language.nativeLanguage" sm="6" cols="12" class="d-flex">
          <v-icon color="primary">mdi-translate</v-icon>
          <v-card-text>
            {{ student.language.nativeLanguage }}
          </v-card-text>
        </v-col>
      </v-row>
      
    </v-container>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    student: Object,
  },
  computed: {
    hasCulture() {
      return (
        this.student.culture ||
        this.student.birthCountry ||
        this.student.DOA ||
        this.student.language
      );
    },
    formattedDOB() {
      return dayjs(this.student.DOB).format('DD MMMM YYYY');
    },
    formattedDOA() {
      return dayjs(this.student.DOA).format('DD MMMM YYYY');
    },
    getInitials() {
      if (this.student) {
        const nameArr = this.student.name.split(' ');
        const firstNameChar = nameArr[0].charAt(0);
        if (nameArr.length > 1) {
          const lastNameChar = nameArr[1].charAt(0);
          return firstNameChar + lastNameChar;
        }
        return firstNameChar;
      }
      return '';
    },
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp ? 128 : 96;
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
