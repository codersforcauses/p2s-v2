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
        <v-toolbar-title class="text-h6">Create Session</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" @keyup.native.enter="createSession($event)">
        <v-container class="pa-4">
          <v-row no-gutters>

            <v-col cols="6" tag="label" class="v-label pl-6">TYPE</v-col>
            <v-col cols="6" tag="label" class="v-label pl-6">LOCATION</v-col>
            <v-col cols="6" class="pr-3 pt-1">
              <v-select
                v-model="type"
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
                v-model="location"
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
            
            <v-col cols="6" tag="label" class="v-label pl-6">DATE</v-col>
            <v-col cols="6" tag="label" class="v-label pl-6">TIME</v-col>
            <v-col cols="6" style="padding-right: 2px;">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    :rules="[validation.required]"
                    class="mb-2 mt-1 rounded-l-xl rounded-r-0"
                    color="primary"
                    solo-inverted
                    flat
                    label="Session Date"
                    hint="Enter the session's date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  color="primary"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    :rules="[validation.required]"
                    class="mb-2 mt-1 rounded-l-0 rounded-r-xl"
                    color="primary"
                    solo-inverted
                    flat
                    label="Session Time"
                    hint="Enter the session's time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                  color="primary"
                ></v-time-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6">SCHOOL</v-col>
            <v-col cols="12">
              <SchoolSearch v-model="school" />
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6">COACHES</v-col>
            <v-col cols="12">
              <CoachSearch v-model="coaches" />
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
                @click.stop.prevent="createSession"
              >Create Session</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import SchoolSearch from '../forms/schoolSearch.vue';
import CoachSearch from '../forms/coachSearch.vue';

export default {
  components: { SchoolSearch, CoachSearch },
  name: 'create-session',
  props: ['value'],
  data() {
    return {
      date: null,
      time: null,
      school: '',
      type: '',
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
      menu2: false,
      location: '',
      coaches: [],
      loading: false,
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        validDate: value => dayjs(value).isValid() || 'Date is not valid',
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
    dark(){
      return this.$vuetify.theme.dark
    }
  },
  methods: {
    ...mapActions('sessions', { create: 'create'}),
    async createSession() {
      const { type, location, time, date, school, coaches } = this
      const timeArr = time.split(':')
      const dateTime = dayjs(date).set('hour', timeArr[0]).set('minute', timeArr[1]).toDate()
      this.loading = true
      const session = await this.create({
        type,
        location,
        date: dateTime,
        school,
        coaches
      })
      this.$emit('created', session._id)
      this.$emit('input')
    }
  }
};
</script>

<style scoped>
  .v-select__selections {
    padding-top: 10px !important;
  }
</style>