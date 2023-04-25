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
        <v-toolbar-title class="text-h6">{{ sessionId ? 'Edit' : 'Add' }} Session</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

    <FeathersVuexFormWrapper :item="item">
      <template v-slot="{ clone, save }">
        <v-form v-model="valid" @submit.prevent="e => handleSubmit(e, save)">
          <v-container class="pa-4">
            <v-row no-gutters>

              <v-col cols="6" tag="label" class="v-label pl-6">Type</v-col>
              <v-col cols="6" tag="label" class="v-label pl-6">Location</v-col>
              <v-col cols="6" class="pr-3 pt-1">
                <v-select
                  v-model="clone.type"
                  :items="types"
                  label="Session Type/Activity"
                  solo-inverted
                  flat
                  filled
                  rounded
                  color="primary"
                  height="48"
                  dense
                  :menu-props="{
                    offsetY: true,
                    light: dark,
                    dark: !dark,
                    transition: 'slide-y-transition',
                    rounded: 'xl',
                    contentClass: 'elevation-0',
                  }"
                />
              </v-col>
              <v-col cols="6">
              <v-text-field
                  v-model="clone.location"
                  label="Location Details"
                  class="mb-2 mt-1"
                  solo-inverted
                  flat
                  rounded
                  type="text"
                  color="primary"
                  :disabled="loading"
                />
              </v-col>
              
              <v-col cols="6" tag="label" class="v-label pl-6">Date</v-col>
              <v-col cols="6" tag="label" class="v-label pl-6">Time</v-col>
              <v-col cols="6" style="padding-right: 2px;">
                <v-text-field
                  v-model="dateFormatted"
                  label="Session Date"
                  hint="DD/MM/YYYY"
                  solo-inverted
                  flat
                  rounded
                  color="primary"
                  class="mb-2 mt-1 rounded-l-xl rounded-r-0"
                  persistent-hint
                  @blur="internalDate = dateFormatted; clone.date = dateTime ? dateTime.toISOString() : null"
                  :rules="[validation.required, validation.validDate]"
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
                        min="1970-01-01"
                        @input="dateMenu = false; clone.date = dateTime ? dateTime.toISOString() : null"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="timeFormatted"
                  label="Session Time"
                  solo-inverted
                  flat
                  rounded
                  color="primary"
                  class="mb-2 mt-1 rounded-l-0 rounded-r-xl"
                  persistent-hint
                  @blur="internalTime = timeFormatted; clone.date = dateTime ? dateTime.toISOString() : null"
                  :rules="[validation.required, validation.validTime]"
                  lazy-validation
                >
                  <template v-slot:append>
                    <v-menu
                      ref="menu"
                      v-model="timeMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      left
                      origin="top right"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" icon v-bind="attrs" v-on="on"
                          ><v-icon>mdi-clock-outline</v-icon></v-btn
                        >
                      </template>
                      <v-time-picker
                        v-model="internalTime"
                        color="primary"
                      >
                        <v-btn color="primary" style="width: 100%;" @click="$refs.menu.save(internalTime); clone.date = dateTime ? dateTime.toISOString() : null"
                          ><v-icon>mdi-check</v-icon></v-btn
                        >
                      </v-time-picker>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" tag="label" class="v-label pl-6">SCHOOL</v-col>
              <v-col cols="12">
                <SchoolSearch v-model="clone.school" />
              </v-col>

              <v-col cols="12" tag="label" class="v-label pl-6">COACHES</v-col>
              <v-col cols="12">
                <CoachSearch v-model="clone.coaches" />
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
              <v-col cols="12" class="mt-3">
                <v-btn
                  depressed
                  rounded
                  class="ma-0"
                  style="float: right"
                  color="primary"
                  :disabled="!valid || loading"
                  :loading="loading"
                  type="submit"
                >{{ sessionId ? 'Update' : 'Add' }} Session</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        </template>
      </FeathersVuexFormWrapper>
    </v-card>
  </v-dialog>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import SchoolSearch from '../../forms/schoolSearch.vue';
import CoachSearch from '../../forms/coachSearch.vue';

dayjs.extend(customParseFormat)

export default {
  components: { SchoolSearch, CoachSearch },
  name: 'create-session',
  props: {
    value: Boolean,
    sessionId: String
  },
  data() {
    return {
      dateTime: dayjs(),
      dateFormatted: '',
      timeFormatted: '',
      school: '',
      types: [
        'Rugby',
        'Classroom',
        'Rugby/Classroom',
        'Employability',
        'Tournament',
        'Induction',
        'Other'
      ],
      menu: false,
      dateMenu: false,
      timeMenu: false,
      location: '',
      coaches: [],
      loading: false,
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        validDate: value => dayjs(value, ['DD/MM/YYYY', 'YYYY-MM-DD']).isValid() || 'Date is not valid',
        validTime: value => dayjs(value.toUpperCase(), ['h:mmA', 'hA', 'h:mmA', 'HH:mm']).isValid() || 'Time is not valid',
      },
    };
  },
  mounted() {
    this.dateTime = dayjs(this.item.date)
  },
  computed: {
    item() {
      const { Session } = this.$FeathersVuex.api

      const targetSession = this.sessionId ? Session.getFromStore(this.sessionId) : new Session()
      return targetSession
    },
    internalDate: {
      get() {
        const parsed = dayjs(this.dateTime)
        return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
      },
      set(val) {
        const parsed = dayjs(val, ['DD/MM/YYYY', 'YYYY-MM-DD'])
        if(parsed.isValid()) this.dateTime = this.dateTime.date(parsed.date()).month(parsed.month()).year(parsed.year())
      }
    },
    internalTime: {
      get() {
        const parsed = dayjs(this.dateTime)
        return parsed.isValid() ? parsed.format('HH:mm') : ''
      },
      set(val) {
        if (val) {
          const parsed = dayjs(val.toUpperCase(), ['h:mmA', 'hA', 'h:mmA', 'HH:mm'])
          if(parsed.isValid()) this.dateTime = this.dateTime.hour(parsed.hour()).minute(parsed.minute())
        }
      }
    },
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
    }
  },
  methods: {
    handleSubmit(session, callback) {
      callback(session).then((savedSession) => this.handleSaveReponse(savedSession));
    },
    handleSaveReponse(session) {
      if (!this.sessionId) {
        this.$router.push({ path: `/session/${session._id}` });
      }
      this.$emit('input');
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'item.date': function(val) {
      this.dateTime = dayjs(val)
    },
    dateTime: {
      handler(val) {
        const parsed = dayjs(val)
        if (parsed.isValid()) {
          this.dateFormatted = parsed.format('DD/MM/YYYY')
          this.timeFormatted = parsed.format('h:mmA')
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
  .v-select__selections {
    padding-top: 10px !important;
  }
</style>