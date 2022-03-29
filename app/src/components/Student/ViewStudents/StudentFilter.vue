<template>
  <v-toolbar flat>
    <FeathersVuexFind
      v-slot="{ items: schools, isFindPending: isPending }"
      service="schools"
      :params="{ query: {} }"
    >
      <v-row v-if="schools">
        <v-col cols="8" class="pa-0">
          <v-autocomplete
            v-model="selectedSchool"
            :loading="isPending"
            :items="schools"
            :search-input.sync="search"
            color="primary"
            rounded
            flat
            cache-items
            clearable
            hide-selected
            hide-details
            dense
            style="padding-right: 1px;"
            class="rounded-r-0"
            item-text="name"
            item-value="_id"
            label="Search for a school"
            solo-inverted
            :menu-props="{
              offsetY: true,
              light: dark,
              dark: !dark,
              transition: 'slide-y-transition',
              rounded: 'xl',
              contentClass: 'elevation-0',
            }"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-title>
                  Search Schools
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-autocomplete>
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
    </FeathersVuexFind>
    <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
      <v-btn icon color="primary" :disabled="pageSkip === 0" @click="pageSkip -= limit">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span>Page {{skip/limit+1}}</span>
      <v-btn icon color="primary" :disabled="pageSkip + limit >= queryInfo.total" @click="pageSkip += limit">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    filterSchool: String,
    filterYear: Number,
    skip: Number,
    limit: Number,
    queryInfo: Object
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
    pageSkip: {
      get() {
        return this.skip
      },
      set(val) {
        this.$emit('setSkip', val)
      }
    },
  }
}
</script>
