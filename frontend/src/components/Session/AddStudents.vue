<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    style="position: relative;"
  >
    <v-card flat rounded="xl">
      <v-toolbar flat style="position: sticky;">
        <v-toolbar-title class="text-h6">Add Students</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-toolbar flat style="position: sticky;">
          <FeathersVuexFind v-slot="{ items: schools, isFindPending: isPending }" service="schools" :params="{ query }" watch="params">
                <v-autocomplete
                  v-model="selectedSchools"
                  :loading="isPending"
                  :items="schools"
                  :search-input.sync="search"
                  color="primary"
                  rounded
                  flat
                  cache-items
                  clearable
                  hide-selected
                  style="padding-right: 1px;"
                  class="rounded-r-0"
                  :filter="searchFilter"
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
              </FeathersVuexFind>
          <v-select v-model="selectedYear" :items="years" item-text="text" item-value="value" label="School Year" rounded filled dense class="mb-2 rounded-l-0"></v-select>
      </v-toolbar>
      <FeathersVuexFind
        v-slot="{ items: students }"
        service="students"
        :params="{ query }"
        watch="params"
      >
        <v-skeleton-loader type="list-item-two-line@10" :loading="!students">
          <v-list two-line subheader flat>
            <v-list-item-group multiple v-model="selected" color="primary">
              <template v-for="student in students">
                <v-list-item :key="student._id" class="px-0 px-sm-3">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="primary"></v-checkbox
                    ></v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title class="text--primary">{{
                        student.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle class="text--secondary">
                        Year {{ student.schoolYear }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>{{ student.school }}</v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-skeleton-loader>
      </FeathersVuexFind>
      <v-card style="position: absolute; bottom: 0;" class="rounded-b-xl" width="100%" height="20px"
        >Add</v-card
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    selected: [],
    selectedSchool: '',
    search: '',
    selectedYear: null,
    years: [
      { text: "All Years", value: null },
      { text: "Year 8", value: 8 },
      { text: "Year 9", value: 9 },
      { text: "Year 10", value: 10 },
      { text: "Year 11", value: 11 },
      { text: "Year 12", value: 12 },
    ]
  }),
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    dark(){
      return this.$vuetify.theme.dark
    },
    query() {
      return  {
        $sort: {
          name: 1,
        },
      ...( this.selectedYear && {schoolYear: this.selectedYear}),
      ...( this.selectedSchool && {school: this.selectedSchool}),
      $limit: 1000
      } 
    },
  },
};
</script>
