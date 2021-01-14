<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat rounded="xl">
      <v-toolbar flat>
        <v-toolbar-title class="text-h6">Add Students</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" @keyup.native.enter="addStudents" class="overflow-y-hidden" style="max-height: 100%">
        <v-container class="pa-4 overflow-y-auto" style="max-height: 100%">
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6 mb-1">STUDENTS</v-col>
            <v-col cols="12">
              <FeathersVuexFind v-slot="{ items: students, isFindPending: isPending }" service="students" :params="{ query }" watch="params">
                <div>
                  {{ log(students.map(student => student.name)) }}
                  
                <v-autocomplete
                  v-model.trim="studentList"
                  :items="students"
                  :loading="isPending"
                  :search-input.sync="search"
                  color="primary"
                  rounded
                  flat
                  cache-items
                  clearable
                  hide-details
                  hide-selected
                  :filter="searchFilter"
                  item-text=""
                  item-value="_id"
                  label="Search for a student"
                  solo-inverted
                  :rules="[validation.moreThanNone]"
                  multiple
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
                        No Students Found
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click="data.select"
                      @click:close="remove(data.item)"
                    >
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content >{{ data.item.name }}</v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-content>
                        <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                        <v-list-item-subtitle>Year {{ data.item.schoolYear }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
                </div>
              </FeathersVuexFind>
            </v-col>
            
            <v-col cols="12" class="my-4" v-show="alert">
              <v-alert
                dismissible
                rounded="pill"
                v-model="alert"
                type="error"
                name="alert"
                class="ma-0"
                transition="slide-y-transition"
              >{{ error }}</v-alert>
            </v-col>

            <v-col cols="12" class="mt-3 mb-3">
              <v-btn
                depressed
                rounded
                class="black--text ma-0"
                style="float: right"
                color="primary"
                :disabled="!valid || loading"
                :loading="loading"
                @click.stop.prevent="addStudents"
              >Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['value', 'session'],
  data() {
    return {
      studentList: [],
      search: '',
      alert: false,
      error: '',
      loading: false,
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        moreThanNone: value => value.length > 0 || 'Must have one or more entries'
      },
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    query() {
      return {
        // $or: [
        //   { name: { first: {
        //     $gte: this.search
        //   }}},
        //   { name: { last: {
        //     $gte: this.search
        //   }}},
        // ]
        
        // name: {
        //   $gte: this.search
        // }
        $skip: 10
      }
    },
    dark(){
      return this.$vuetify.theme.dark
    }
  },
  methods: {
    ...mapActions('sessions', { patch: 'patch' }),
    async addStudents() {
      if(this.valid) {
        const { Session } = this.$FeathersVuex.api
        const updatedSession = new Session({
          ...this.session, 
          students: [...this.session.students, ...this.studentList]
        })
        updatedSession.save()
        this.$emit('input', false);
      }
    },
    log(stuff) {
      console.log(stuff)
    },
    searchFilter (item, queryText) {
      const text = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return text.indexOf(searchText) > -1
    },
    remove (item) {
      console.log(item)
      const index = this.studentList.findIndex((student) => item._id === student._id)
      if (index >= 0) this.studentList.splice(index, 1)
    },
  },
};
</script>
