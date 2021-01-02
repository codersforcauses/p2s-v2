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

            <v-col cols="12" tag="label" class="v-label pl-6">ASSIGN REGION</v-col>
            <v-col cols="12">
              <v-autocomplete
                solo-inverted
                flat
                persistent-hint
                cache-items
                hide-selected
                rounded
                placeholder="Start typing..."
                type="text"
                color="primary"
                hint="Important for coaches"
                class="mb-2 mt-1 select__flat"
                v-model.trim="user.region"
                item-text="name"
                item-value="_id"
                :items="listRegions"
                :search-input.sync="search"
                :loading="loadRegions"
                :disabled="loading"
                :rules="[validation.required]"
                :menu-props="{ offsetY: true, transition: 'slide-y-transition', rounded: 'b-xl', elevation: '0'}"
              >
                <template #no-data>
                  <div class="list">
                    Can't find the region you wanted? Create a new
                    <a
                      slot="activator"
                      href="/region"
                      target="_blank"
                      class="primary--text text-decoration-none"
                      @click.stop
                    >
                      region
                      <v-icon size="1rem" color="primary">mdi-open-in-new</v-icon>
                    </a>
                    <p
                      class="caption ma-0"
                    >Please refresh the page if you do not see a created region.</p>
                  </div>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" tag="label" class="v-label pl-6 pb-3">ROLES</v-col>
            <v-col cols="12" class="ml-3">
              <v-checkbox
                v-model="permissions"
                value="admin"
                label="Administrator"
                color="primary"
                class="ma-0 pa-0"
                :error="!!permError"
              />
              <v-checkbox
                v-model="permissions"
                value="coach"
                persistent-hint
                label="Coach"
                class="ma-0 pa-0"
                hint="These can be changed later by any Administrator"
                :error-messages="permError"
                color="primary"
              />
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
                :disabled="!valid || loading || checkPerm || checkPerm === undefined"
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
      search: undefined,
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
    search(val = '') {
      if (!this.listRegions.includes(val)) {
        this.findRegionsInStore({
          query: {
            name: {
              $gte: val,
            },
            $select: ['id', 'name'],
          },
        });
      }
    },
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
    // loading() {
    //   return this.createAdmin || this.createCoach;
    // },
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

<style scoped>
/*
.list {
  padding: calc(0.5 * var(--thiccness)) var(--thiccness);
}
.v-input--v-checkbox >>> .v-input__slot {
  margin: 0 !important;
}
*/
</style>
