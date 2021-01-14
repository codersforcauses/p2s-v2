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
        <v-toolbar-title class="text-h6">Create Student</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" @keyup.native.enter="createStudent($event)" class="overflow-y-hidden" style="max-height: 100%">
        <v-container class="pa-4 overflow-y-auto" style="max-height: 100%">
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6">NAME</v-col>
            <v-col cols="12">
              <v-text-field
                solo-inverted
                flat
                persistent-hint
                rounded
                hint="Enter the student's name"
                type="text"
                class="mb-2 mt-1"
                placeholder="Name"
                color="primary"
                :disabled="loading"
                :rules="[validation.required, validation.name]"
                v-model.trim="student.name"
              />
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6">DATE OF BIRTH</v-col>
            <v-col cols="12">
              <v-menu
                ref="menu"
                v-model.trim="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model.trim="dateFormatted"
                    hint="DD/MM/YYYY format"
                    solo-inverted
                    flat
                    rounded
                    color="primary"
                    class="mb-2 mt-1"
                    persistent-hint
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    :rules="[validation.required, validation.past]"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="student.dob"
                  ref="picker"
                  no-title
                  min="1950-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                  @input="menu = false"
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6">GENDER</v-col>
            <v-row cols="12" class="ml-3">
              <v-radio-group v-model.trim="student.gender" row>
                <v-col cols="4">
                  <v-radio
                    label="Male"
                    value="male"
                  />
                </v-col>
                <v-col cols="4">
                  <v-radio
                    label="Female"
                    value="female"
                  />
                </v-col>
                <v-col cols="4">
                  <v-radio
                    label="Other"
                    value="other"
                  />
                </v-col>
              </v-radio-group>
            </v-row>

            <v-expansion-panels flat class="mb-2">
            <v-expansion-panel>
              <v-expansion-panel-header>
                CULTURE
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row cols="12" class="ml-0">
                  <v-col cols="12" tag="label" class="v-label pl-6 pb-0">CULTURAL BACKGROUND</v-col>
                  <v-col cols="6" class="pt-0 pl-0" style="padding-right: 1px;">
                    <v-text-field
                    label="Ethnicity"
                      v-model.trim="student.culture[0]"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="What is the students cultural/ethnic background"
                      class="mb-2 mt-1 rounded-l-xl rounded-r-0"
                      color="primary"
                      :disabled="loading"
                      :rules="[validation.required]"
                    />
                  </v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Birth Country"
                      v-model.trim="student.birthCountry"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Where was the student born"
                      class="mb-2 mt-1 rounded-r-xl rounded-l-0"
                      color="primary"
                      :disabled="loading"
                      :rules="[validation.required]"
                    />
                  </v-col>
                </v-row>

                <v-row cols="12" class="ml-0">
                  <v-col cols="12" tag="label" class="v-label pl-6 pb-0">LANGUAGE</v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Native Language"
                      v-model.trim="student.language.nativeLanguage"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="What is the students native language"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading"
                    />
                  </v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-checkbox label="English Competent" v-model="student.language.englishCompetent" :value="true"></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>

            <v-expansion-panels flat class="mb-2">
            <v-expansion-panel>
              <v-expansion-panel-header>
                MEDICAL
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
            
            <v-expansion-panels flat class="mb-2">
            <v-expansion-panel>
              <v-expansion-panel-header>
                CONTACT
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row cols="12" class="ml-0">
                  <v-col cols="12" tag="label" class="v-label pl-6 pb-0">HOME</v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Name"
                      v-model.trim="student.contact.home.name"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Home contact name"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading"
                    />
                  </v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Phone Number"
                      v-model.trim="student.contact.home.homeNumber"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Home phone number"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading"
                    />
                  </v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Mobile"
                      v-model.trim="student.contact.home.mobileNumber"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Mobile contact name"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading"
                    />
                  </v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Email"
                      v-model.trim="student.contact.home.email"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Contact email"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading"
                    />
                  </v-col>
                </v-row>

                <v-row cols="12" class="ml-0">
                  <v-col cols="6" tag="label" class="v-label pl-6 pb-0 pt-5">EMERGENCY</v-col>
                  <v-col cols="6" class="pb-0"><v-checkbox label="Use Same Contact" class="ma-0" v-model="contactSame" :value="true"></v-checkbox></v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Name"
                      v-model.trim="student.contact.emergency.name"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Emergency contact name"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading || contactSame"
                    />
                  </v-col>
                  <v-col cols="6" class="pt-0 pl-0">
                    <v-text-field
                      label="Mobile Number"
                      v-model.trim="student.contact.emergency.mobileNumber"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      hint="Emergency phone number"
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading || contactSame"
                    />
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>

            <v-col cols="12" tag="label" class="v-label pl-6">NOTES</v-col>
            <v-col cols="12">
              <v-textarea
                solo-inverted
                flat
                persistent-hint
                rounded
                hint="Extra info/notes"
                class="mb-2 mt-1"
                color="primary"
                :disabled="loading"
                :rules="[validation.required]"
                v-model.trim="student.extraInfo"
              />
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6 mb-1">SCHOOL</v-col>
            <v-col cols="12">
              <FeathersVuexFind v-slot="{ items: schools, isFindPending: isPending }" service="schools" :params="{ query }" watch="params">
                <v-autocomplete
                  v-model.trim="student.school"
                  :items="schools"
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
                @click.stop.prevent="creatStudent"
              >Add Student</v-btn>
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
  props: ['value'],
  data() {
    return {
      student: {
        name: {
          first: '',
          last: '',
        },
        dob: new Date('01/02/2000').toISOString().substr(0, 10),
        schoolYear: null,
        culture: [''],
        birthCountry: '',
        language: {
          englishCompetent: true,
          nativeLanguage: ''
        },
        medical: {
          allergies: '',
          injuries: '',
          condition: '',
          extraInfo: ''
        },
        contact: {
          home: {
            name: '',
            homeNumber: '',
            mobileNumber: '',
            email: '',
          },
          emergency: {
            name: '',
            mobileNumber: ''
          }
        },
        extraInfo: '',
        school: '',
      },
      contactSame: true,
      dateFormatted: this.formatDate(new Date('01/02/2000').toISOString().substr(0, 10)),
      menu: false,
      search: '',
      alert: false,
      error: '',
      loading: false,
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        name: value => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
        past: value => {
          return this.parseDate(value) <= new Date().toISOString().substr(0, 10) ||'Date must be in the past'
        }
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
        name: {
          $gte: this.search
        }
      }
    },
    dark(){
      return this.$vuetify.theme.dark
    }
  },
  watch: {
      // eslint-disable-next-line func-names
      'student.dob': function () {
        this.dateFormatted = this.formatDate(this.student.dob)
      },
      menu (val) {
        if(val) setTimeout(() => {
          this.$refs.picker.activePicker = 'YEAR'
        })
      },
      contactSame () {
        if (this.contactSame) {
          this.student.contact.emergency.name = this.student.contact.home.name
          this.student.contact.emergency.mobileNumber = this.student.contact.home.mobileNumber
        }
      },
      // eslint-disable-next-line func-names
      'student.contact.home.name': function () {
        if (this.contactSame) {
          this.student.contact.emergency.name = this.student.contact.home.name
        }
      },
      // eslint-disable-next-line func-names
      'student.contact.home.mobileNumber': function () {
        if (this.contactSame) {
          this.student.contact.emergency.mobileNumber = this.student.contact.home.mobileNumber
        }
      }
    },
  methods: {
    ...mapActions('students', { create: 'create' }),
    async createStudent() {
      if(this.valid) {
        const res = await this.create(this.student)
        this.$emit('created', res._id)
        this.$emit('input')
      }
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    searchFilter (item, queryText) {
        const text = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return text.indexOf(searchText) > -1
      },
  },
};
</script>
