<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <FeathersVuexFormWrapper :item="item">
      <template v-slot="{ clone, save }">
            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="(e) => handleSubmit(e, save)"
              style="max-height: 100%"
            >
        <v-card flat rounded="xl">
          <v-toolbar flat>
            <v-toolbar-title class="text-h6"
              >{{ studentId ? 'Edit' : 'Add' }} Student</v-toolbar-title
            >
            <v-spacer />
            <v-btn icon @click="$emit('input')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="pa-0">
              <v-container class="pa-4 overflow-y-auto" style="max-height: 100%">
                <v-row no-gutters>
                  <v-col cols="12" tag="label" class="v-label pl-6">NAME</v-col>
                  <v-col cols="12">
                    <v-text-field
                      solo-inverted
                      flat
                      persistent-hint
                      rounded
                      hint="Enter the student's name (required)"
                      type="text"
                      class="mb-2 mt-1"
                      placeholder="Name"
                      color="primary"
                      :rules="[validation.required, validation.name]"
                      v-model.trim="clone.name"
                    />
                  </v-col>

                  <v-col cols="12" tag="label" class="v-label pl-6">DATE OF BIRTH</v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Student Date of Birth"
                      hint="DD/MM/YYYY"
                      solo-inverted
                      flat
                      rounded
                      color="primary"
                      class="mb-2 mt-1"
                      persistent-hint
                      @change="clone.DOB = internalDate"
                      @blur="internalDate = dateFormatted"
                      :rules="[validation.required, validation.validDate, validation.past, validation.tooYoung]"
                      lazy-validation
                    >
                      <template v-slot:append>
                        <v-menu
                          ref="menu"
                          v-model="dateMenu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          left
                          origin="top right"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" icon v-bind="attrs" v-on="on"
                              ><v-icon>mdi-calendar</v-icon></v-btn
                            >
                          </template>
                          <v-date-picker
                            v-model="internalDate"
                            :active-picker.sync="activePicker"
                            :max="new Date()
                                .toISOString()
                                .substr(0, 10)
                            "
                            no-title
                            min="1970-01-01"
                            @input="dateMenu = false"
                            color="primary"
                          ></v-date-picker>
                        </v-menu>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" tag="label" class="v-label pl-6">GENDER</v-col>
                  <v-row cols="12" class="ml-3">
                    <v-radio-group v-model.trim="clone.gender" value="Other" row>
                      <v-col cols="4">
                        <v-radio label="Male" value="Male" />
                      </v-col>
                      <v-col cols="4">
                        <v-radio label="Female" value="Female" />
                      </v-col>
                      <v-col cols="4">
                        <v-radio label="Other" value="Other" />
                      </v-col>
                    </v-radio-group>
                  </v-row>

                  <v-expansion-panels flat class="mb-2" multiple v-model="openPanels">
                    <v-expansion-panel>
                      <v-expansion-panel-header> CULTURE </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row cols="12" class="ml-0">
                          <v-col cols="12" tag="label" class="v-label pl-6 pb-0"
                            >CULTURAL BACKGROUND</v-col
                          >
                          <v-col cols="6" class="pt-0 pl-0" style="padding-right: 1px">
                            <v-text-field
                              label="Ethnicity"
                              v-model.trim="clone.culture"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="What is the students cultural/ethnic background"
                              class="mb-2 mt-1 rounded-l-xl rounded-r-0"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Birth Country"
                              v-model.trim="clone.birthCountry"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Where was the student born"
                              class="mb-2 mt-1 rounded-r-xl rounded-l-0"
                              color="primary"
                            />
                          </v-col>
                        </v-row>

                        <v-row cols="12" class="ml-0">
                          <v-col cols="12" tag="label" class="v-label pl-6 pb-0">LANGUAGE</v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Native Language"
                              v-model.trim="clone.language.nativeLanguage"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="What is the students native language"
                              class="mb-2 mt-1"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-checkbox
                              label="English Competent"
                              v-model="clone.language.englishCompetent"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header> MEDICAL </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row cols="12" class="ml-0">
                          <v-col cols="12" class="pt-0 pl-0">
                            <v-text-field
                              label="Allergies"
                              v-model.trim="clone.medical.allergies"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Does the student have any allergies"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="12" class="pt-0 pl-0">
                            <v-text-field
                              label="Injuries"
                              v-model.trim="clone.medical.injuries"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Does the student have any injuries"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="12" class="pt-0 pl-0">
                            <v-text-field
                              label="Conditions"
                              v-model.trim="clone.medical.condition"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Does the student have any medical conditions"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="12" class="pt-0 pl-0">
                            <v-textarea
                              label="Extra info"
                              solo-inverted
                              flat
                              auto-grow
                              persistent-hint
                              rounded
                              hint="Extra notes on medical issues"
                              :class="medTextFocus ? 'focus' : ''"
                              @focus="medTextFocus = true"
                              @blur="medTextFocus = false"
                              v-model.trim="clone.medical.extraInfo"
                            />
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header> CONTACT </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row cols="12" class="ml-0">
                          <v-col cols="12" tag="label" class="v-label pl-6 pb-0">HOME</v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Name"
                              v-model.trim="clone.contact.home.name"
                              solo-inverted
                              flat
                              persistent-hint
                              rounded
                              hint="Home contact name (required)"
                              class="mb-2 mt-1"
                              color="primary"
                              :rules="[validation.required, validation.name]"
                            />
                          </v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Mobile"
                              v-model.trim="clone.contact.home.mobileNumber"
                              solo-inverted
                              flat
                              persistent-hint
                              rounded
                              hint="Mobile contact name (required)"
                              class="mb-2 mt-1"
                              color="primary"
                              :rules="[validation.required]"
                            />
                          </v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Phone Number"
                              v-model.trim="clone.contact.home.homeNumber"
                              solo-inverted
                              flat
                              persistent-hint
                              rounded
                              hint="Home phone number"
                              class="mb-2 mt-1"
                              color="primary"
                            />
                          </v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Email"
                              v-model.trim="clone.contact.home.email"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Contact email"
                              class="mb-2 mt-1"
                              color="primary"
                            />
                          </v-col>
                        </v-row>

                        <v-row cols="12" class="ml-0">
                          <v-col cols="12" tag="label" class="v-label pl-6 pb-0 pt-5"
                            >EMERGENCY</v-col
                          >
                          <!-- <v-col cols="6" class="pb-0">
                            <v-checkbox
                              label="Use Same Contact"
                              class="ma-0"
                              v-model="contactSame"
                              :value="true"
                            ></v-checkbox>
                            </v-col> -->
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Name"
                              v-model.trim="clone.contact.emergency.name"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Emergency contact name (required)"
                              class="mb-2 mt-1"
                              color="primary"
                              :disabled="loading"
                              :rules="[validation.required]"
                            />
                          </v-col>
                          <v-col cols="6" class="pt-0 pl-0">
                            <v-text-field
                              label="Mobile Number"
                              v-model.trim="clone.contact.emergency.mobileNumber"
                              solo-inverted
                              flat
                              persistent-hint
                              validate-on-blur
                              rounded
                              hint="Emergency phone number (required)"
                              class="mb-2 mt-1"
                              color="primary"
                              :disabled="loading"
                              :rules="[validation.required]"
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
                      auto-grow
                      hide-details
                      rounded
                      hint="Extra info/notes"
                      class="mb-2 mt-1"
                      :class="textFocus ? 'focus' : ''"
                      @focus="textFocus = true"
                      @blur="textFocus = false"
                      v-model.trim="clone.extraInfo"
                    />
                  </v-col>
                  <v-col cols="12" tag="label" class="v-label pl-6 mb-1">SCHOOL</v-col>
                  <v-col cols="8">
                    <SchoolSearch v-model="clone.school" menuClasses="rounded-r-0" />
                  </v-col>
                  <v-col cols="4" class="pt-0 pl-0 mb-3">
                    <v-text-field
                      label="School Year"
                      prefix="Year"
                      v-model.trim="clone.schoolYear"
                      solo-inverted
                      flat
                      hide-details
                      dense
                      validate-on-blur
                      rounded
                      class="mb-2 rounded-l-0"
                      color="primary"
                      :rules="[validation.number]"
                    />
                  </v-col>
                  <v-row class="pb-4" no-gutters>
                    <v-col cols="6">
                      <v-checkbox
                        hide-details
                        label="Consent form recieved"
                        class="ma-0 mt-1"
                        v-model="clone.consent"
                      />
                    </v-col>
                  </v-row>
                </v-row>
            <v-row class="pb-4" no-gutters>
              <v-col cols="8">
                <v-alert
                  rounded="pill"
                  v-model="alert"
                  type="error"
                  name="alert"
                  class="ma-0"
                  transition="slide-y-transition"
                  dense
                >
                  {{ error }}
                </v-alert>
              </v-col>
              <v-col cols="4">
                <v-btn
                  depressed
                  rounded
                  class="ma-0"
                  style="float: right"
                  color="primary"
                  :disabled="loading"
                  :loading="loading"
                  type="submit"
                  >{{ studentId ? 'Update' : 'Add' }} Student</v-btn
                >
              </v-col>
            </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        </v-form>
      </template>
    </FeathersVuexFormWrapper>
  </v-dialog>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import SchoolSearch from '../../forms/schoolSearch.vue';

dayjs.extend(customParseFormat)

export default {
  name: 'StudentDialog',
  components: {
    SchoolSearch
  },
  props: {
    value: Boolean,
    studentId: String,
  },
  data() {
    return {
      textFocus: false,
      medTextFocus: false,
      contactSame: true,
      date: '2000-01-01',
      dateFormatted: '',
      activePicker: null,
      dateMenu: false,
      loading: false,
      alert: false,
      error: '',
      openPanels: [0, 1, 2],
      valid: false,
      validation: {
        required: (value) => !!value || 'This field is required',
        name: (value) => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
        number: (value) => {
          const pattern = /^[0-9]+$/i;
          return pattern.test(value) || 'Number required';
        },
        past: (value) =>
          dayjs(value, 'DD/MM/YYYY').isBefore(dayjs()) ||
          'Date must be in the past',
        tooYoung: (value) =>
          dayjs(value, 'DD/MM/YYYY').isBefore(dayjs().subtract(2, 'year')) ||
          'Child is too young',
        validDate: (value) =>
          dayjs(value, 'DD/MM/YYYY').isValid() || 'Invalid date',
      },
    }
  },
  mounted() {
    this.date = dayjs(this.item.date).subtract(12, 'years').format('YYYY-MM-DD')
  },
  computed: {
    internalDate: {
      get() {
        const parsed = dayjs(this.date, 'YYYY-MM-DD')
        return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
      },
      set(val) {
        const parsed = dayjs(val, ['DD/MM/YYYY', 'YYYY-MM-DD'])
        this.date = parsed.isValid() ? parsed : null
      }
    },
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    item() {
      const { Student } = this.$FeathersVuex.api;
      const emptyStudent = {
        language: {},
        medical: {},
        contact: {
          home: {},
          emergency: {}
        }
      }
      if (this.studentId) {
        const studentData = Student.getFromStore(this.studentId)
        return new Student({ ...emptyStudent, ...studentData })
      }
      return new Student(emptyStudent)
    },
  },
  methods: {
    handleSubmit(student, callback) {
      this.alert = false
      this.$refs.form.validate()
      if(this.valid) {
        callback(student).then((savedStudent) => this.handleSaveReponse(savedStudent)).catch(err => this.handleErrorReponse(err));
      }
    },
    handleSaveReponse() {
      if (!this.studentId) {
        // this.$router.push({ path: `/students/${savedStudent._id}` });
        this.$router.push({ path: `/students` });
      }
      this.$emit('input');
    },
    handleErrorReponse(err) {
      if(err.name === 'BadRequest') {
        this.error = 'Failed to validate student data'
      } else {
        this.error = 'Request failed'
      }
      this.alert = true
    },
  },
  watch: {

    date(val) {
      const parsed = dayjs(val, 'YYYY-MM-DD')
      if (parsed.isValid()) this.dateFormatted = parsed.format('DD/MM/YYYY')
    },
    dateMenu (val) {
      if(val) setTimeout(() => {this.activePicker = 'YEAR'})
    },
  }
};
</script>
