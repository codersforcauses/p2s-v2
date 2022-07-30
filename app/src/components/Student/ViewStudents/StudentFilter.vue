<template>
  <v-toolbar flat>
    <v-row>
      <v-col cols="8" class="pa-0">
        <SchoolSearch v-model="selectedSchool" menuClasses="rounded-r-0" />
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="selectedYear"
          :items="years"
          item-text="text"
          item-value="value"
          :menu-props="{
            offsetY: true,
            light: dark,
            dark: !dark,
            transition: 'slide-y-transition',
            rounded: 'xl',
            contentClass: 'elevation-0',
          }"
          label="Year"
          solo-inverted
          clearable
          flat
          hide-details
          rounded
          filled
          dense
          class="rounded-l-0"
        ></v-select>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
import SchoolSearch from '../../forms/schoolSearch.vue';

export default {
  components: { SchoolSearch },
  props: {
    filterSchool: String,
    filterYear: Number,
  },
  data: () => ({
    years: [
      { text: 'Year 8', value: 8 },
      { text: 'Year 9', value: 9 },
      { text: 'Year 10', value: 10 },
      { text: 'Year 11', value: 11 },
      { text: 'Year 12', value: 12 },
    ],
    search: '',
  }),
  computed: {
    selectedSchool: {
      get() {
        return this.filterSchool
      },
      set(school) {
        this.$emit('updateSchool', school);
      },
    },
    selectedYear: {
      get() {
        return this.filterYear
      },
      set(year) {
        this.$emit('updateYear', year);
      },
    },
    dark() {
      return this.$vuetify.theme.dark;
    },
  }
}
</script>
