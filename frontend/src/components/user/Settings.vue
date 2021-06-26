<template>
  <div class="py-sm-5">
    <v-card flat rounded="xl" max-width="750" class="mx-auto">
      <v-form v-model="valid" :readonly="!editing" @keyup.native.enter="createUser($event)">
        <v-container class="pa-5">
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6">Name</v-col>
            <v-col cols="12">
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1 rounded-lg"
                placeholder="Name"
                color="primary"
                :disabled="!editing"
                :rules="[validation.required, validation.name]"
                v-model.trim="user.name"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6">Email</v-col>
            <v-col cols="12">
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1 rounded-lg"
                placeholder="Name"
                color="primary"
                :disabled="!editing"
                :rules="[validation.required, validation.name]"
                v-model.trim="user.email"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6">Password</v-col>
            <v-col cols="12">
              <v-text-field
                solo-inverted
                flat
                type="password"
                class="mb-2 mt-1 rounded-lg"
                placeholder="Password"
                color="primary"
                :disabled="!editing"
                :rules="[validation.required]"
                value="imastrongpassword"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>

            <v-col cols="12" tag="label" class="v-label pl-6 rounded-lg mb-2">Address</v-col>
            <v-col cols="12" style="padding-right: 2px;">
              <span class="ml-6 text-caption text--secondary">Street</span>
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1"
                placeholder="Street"
                color="primary"
                :disabled="!editing"
                v-model.trim="user.address.street"
              />
            </v-col>
            
            <v-col cols="6" style="padding-right: 2px;">
              <span class="ml-6 text-caption text--secondary">Suburb</span>
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1 rounded-lg"
                placeholder="Suburb"
                color="primary"
                :disabled="!editing"
                v-model.trim="user.address.suburb"
              />
            </v-col>
            <v-col cols="3" style="padding-right: 2px;">
              <span class="ml-6 text-caption text--secondary">Postcode</span>
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1 rounded-lg"
                placeholder="Password"
                color="primary"
                :disabled="!editing"
                v-model.trim="user.address.postcode"
              />
            </v-col>
            <v-col cols="3">
              <span class="ml-6 text-caption text--secondary">State</span>
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1 rounded-lg"
                placeholder="Password"
                color="primary"
                :disabled="!editing"
                v-model.trim="user.address.state"
              />
            </v-col>
            
          </v-row>

          <v-row dense v-if="user.coach.is">
            <Clearence title="WWCC" :link="wwcc.imageLink" :editing="editing" :loading="loading" />
            <Clearence title="Police Clearence" :link="policeCheck.imageLink" :editing="editing" :loading="loading" />
            <Clearence title="Medical Clearence" :link="medCheck.imageLink" :editing="editing" :loading="loading" />

            <v-col cols="12" class="my-4" v-show="alert">
              <v-alert
                dismissible
                rounded="pill"
                v-model="alert"
                type="error"
                name="alert"
                class="ma-0"
                transition="slide-y-transition"
                >{{ error }}</v-alert
              >
            </v-col>

            <v-col cols="12" class="mt-3">
              <v-btn
                v-show="editing"
                text
                rounded
                class="ma-0"
                style="float: left"
                color="primary"
                :loading="false"
                @click.stop.prevent="editing = false"
                >Cancel</v-btn
              >
              <v-btn
                v-show="editing"
                depressed
                rounded
                class="ma-0"
                style="float: right"
                color="primary"
                :disabled="!valid"
                :loading="false"
                @click.stop.prevent="createUser"
                >Update</v-btn
              >
              <v-btn
                v-show="!editing"
                text
                rounded
                class="ma-0"
                style="float: right"
                color="primary"
                :loading="false"
                @click.stop.prevent="editing = true"
                >Edit</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Clearence from './ClearenceCard.vue'

export default {
  name: 'User Settings',
  title: 'User Settings',
  components: {
    Clearence
  },
  data() {
    return {
      editing: false,
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        name: value => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
        email: value => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
      },
    };
  },
  computed: {
    ...mapGetters('auth', { user: 'user' }),
    wwcc() {
      return this.user?.coach?.qualifications?.WWC
    },
    medCheck() {
      return this.user?.coach?.qualifications?.medClearance
    },
    policeCheck() {
      return this.user?.coach?.qualifications?.policeClearance
    }
  },
  methods: {
    ...mapActions(['users/patch']),
  }
};
</script>
