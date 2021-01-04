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
        <v-toolbar-title class="text-h6">Invite Users</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" @keyup.native.enter="createUser($event)">
        <v-container class="pa-4">
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6">NAME</v-col>
            <v-col cols="6" style="padding-right: 1px;">
              <v-text-field
                solo-inverted
                flat
                persistent-hint
                hint="Enter the user's name"
                type="text"
                class="mb-2 mt-1 rounded-l-xl rounded-r-0"
                placeholder="First Name"
                color="primary"
                :disabled="loading"
                :rules="[validation.required, validation.name]"
                v-model.trim="user.name.first"
              />
            </v-col>
            <v-col cols="6" style="padding-left: 1px;">
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1 rounded-l-0 rounded-r-xl"
                placeholder="Last Name"
                color="primary"
                :disabled="loading"
                :rules="[validation.required, validation.name]"
                v-model.trim="user.name.last"
              />
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6">EMAIL</v-col>
            <v-col cols="12">
              <v-text-field
                solo-inverted
                flat
                persistent-hint
                validate-on-blur
                rounded
                type="email"
                hint="Enter the user's email address"
                class="mb-2 mt-1"
                color="primary"
                :disabled="loading"
                :rules="[validation.required, validation.email]"
                v-model.trim="user.email"
              />
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6 pb-3">ROLES</v-col>
            <v-row cols="12" class="ml-3">
            <v-col cols="6">
              <v-checkbox
                v-model="permissions"
                value="admin"
                label="Administrator"
                color="primary"
                class="ma-0 pa-0"
                hide-details
              />
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="permissions"
                value="coach"
                label="Coach"
                class="ma-0 pa-0"
                color="primary"
                hide-details
              />
            </v-col>
            <p v-if="permError" class="error--text text-caption pl-3">User must be either Admin or Coach</p>
            <p v-else class="grey--text text-caption pl-3">This can be changed later by an administrator.</p>
            </v-row>
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
                class="black--text ma-0"
                style="float: right"
                color="primary"
                :disabled="!valid || loading || permError"
                :loading="loading"
                @click.stop.prevent="createUser"
              >Send Invite</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  props: ['value'],
  data() {
    return {
      user: {
        email: '',
        region: '',
        name: {
          first: '',
          last: '',
        },
      },
      permissions: [],
      permError: undefined,
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email address';
        },
        name: value => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
      },
    };
  },
  watch: {
    permissions(val) {
      this.permError = val.length === 0 ? 'This field is required' : undefined;
    },
  },
  computed: {
    // ...mapState('admin', { createAdmin: 'isCreatePending' }),
    // ...mapState('coach', { createCoach: 'isCreatePending' }),
    // ...mapState('regions', { loadRegions: 'isFindPending' }),
    // ...mapGetters('regions', { listRegions: 'list' }),
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    loading() {
      return this.createAdmin || this.createCoach;
    },
  },
  methods: {
    // ...mapActions('regions', { findRegionsInStore: 'find' }),
    // async createUser() {
    //   if (this.valid && !!this.permError) {
    //     const tempUser = {
    //       ...this.user,
    //       ...this.permissions,
    //     };
    //     let user;
    //     if (tempUser.admin.is) {
    //       const { Admin } = this.$FeathersVuex;
    //       user = new Admin(tempUser);
    //     } else {
    //       const { Coach } = this.$FeathersVuex;
    //       user = new Coach(tempUser);
    //     }
    //     await user
    //       .create()
    //       .then(() => this.$emit('input'))
    //       .catch(err => {
    //         this.error = err.message
    //           .charAt(0)
    //           .toUpperCase()
    //           .concat(err.message.slice(1));
    //         this.alert = true;
    //       });
    //   }
    // },
  },
};
</script>
