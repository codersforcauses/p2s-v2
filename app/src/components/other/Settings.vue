<template>
  <div class="py-sm-5">
    <v-card flat rounded="xl" max-width="750" class="mx-auto">
      <FeathersVuexFormWrapper :item="item" watch>
        <template v-slot="{ clone, save, reset }">
          <v-form v-model="valid" :disabled="!editing" @keyup.native.enter="save">
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
                    :rules="[validation.required]"
                    v-model.trim="clone.name"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" tag="label" class="v-label pl-6">Email</v-col>
                <v-col :cols="editing ? 11 : 12">
                  <v-text-field
                    solo-inverted
                    flat
                    type="text"
                    class="mb-2 mt-1 rounded-lg"
                    :disabled="true"
                    color="primary"
                    :value="user.email"
                  />
                </v-col>
                <v-col v-if="editing" cols="1" class="d-flex justify-center align-start mt-4">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="#a1a1a1" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>Email is unable to be edited</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" tag="label" class="v-label pl-6">Password</v-col>
                <v-col :cols="editing ? 11 : 12">
                  <v-text-field
                    solo-inverted
                    flat
                    type="password"
                    class="mb-2 mt-1 rounded-lg"
                    :disabled="true"
                    color="primary"
                    value="wakawakawaka"
                  />
                </v-col>
                <v-col v-if="editing" cols="1" class="d-flex justify-center align-start mt-4">
                  <v-icon color="#a1a1a1" dark @click="passwordDialog = true">
                    mdi-pencil
                  </v-icon>
                </v-col>
              </v-row>
              <v-dialog
                v-model="passwordDialog"
                max-width="520"
                content-class="rounded-xl"
              >
                <v-card flat>
                  <v-card-title>Change Password</v-card-title>
                  <v-card-text>
                    <v-text-field
                      solo-inverted
                      flat
                      type="password"
                      class="mb-2 mt-1 rounded-lg"
                      placeholder="Current Password"
                      color="primary"
                      :rules="[validation.required]"
                      autocomplete="current-password"
                      v-model="currentPass"
                    />
                    <v-text-field
                      solo-inverted
                      flat
                      class="mb-2 mt-1 rounded-lg"
                      placeholder="New Password"
                      color="primary"
                      :rules="[validation.required]"
                      autocomplete="new-password"
                      :append-icon="passHidden ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="passHidden = !passHidden"
                      :type="passHidden ? 'password' : 'text'"
                      v-model="newPass"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined color="primary" @click="savePassword">Save</v-btn>
                  </v-card-actions>
                  <v-alert
                    dismissible
                    v-model="hasPassError"
                    class="mb-0"
                    type="error"
                    name="alert"
                    :tile="$vuetify.breakpoint.smAndDown"
                    >{{ passError }}</v-alert
                  >
                </v-card>
              </v-dialog>

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
                    :rules="[validation.required]"
                    v-model.trim="clone.address.street"
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
                    :rules="[validation.required]"
                    v-model.trim="clone.address.suburb"
                  />
                </v-col>
                <v-col cols="3" style="padding-right: 2px;">
                  <span class="ml-6 text-caption text--secondary">Postcode</span>
                  <v-text-field
                    solo-inverted
                    flat
                    type="text"
                    class="mb-2 mt-1 rounded-lg"
                    placeholder="Postcode"
                    color="primary"
                    :rules="[validation.required]"
                    v-model.trim="clone.address.postcode"
                  />
                </v-col>
                <v-col cols="3">
                  <span class="ml-6 text-caption text--secondary">State</span>
                  <v-text-field
                    solo-inverted
                    flat
                    type="text"
                    class="mb-2 mt-1 rounded-lg"
                    placeholder="State"
                    color="primary"
                    :rules="[validation.required]"
                    v-model.trim="clone.address.state"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12" class="mt-3">
                  <v-btn
                    v-show="editing"
                    text
                    rounded
                    class="ma-0"
                    style="float: left"
                    color="primary"
                    :loading="false"
                    @click.stop.prevent="
                      () => {
                        reset();
                        handleCancel();
                      }
                    "
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
                    @click.stop.prevent="save().then(handleSave)"
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
            <v-alert
              dismissible
              rounded="lg"
              v-if="errorMsg"
              v-model="alert"
              type="error"
              name="alert"
              class="ma-0"
              transition="slide-y-transition"
              >{{ error }}</v-alert
            >
            <v-alert
              dismissible
              rounded="lg"
              v-if="successMsg"
              v-model="alert"
              type="success"
              name="success"
              class="ma-0"
              transition="slide-y-transition"
              >{{ successMsg }}</v-alert
            >
          </v-form>
        </template>
      </FeathersVuexFormWrapper>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FeathersVuexFormWrapper } from 'feathers-vuex';

export default {
  name: 'UserSettings',
  title: 'User Settings',
  components: {
    FeathersVuexFormWrapper,
  },
  data() {
    return {
      editing: false,
      alert: false,
      passwordDialog: false,
      currentPass: '',
      newPass: '',
      passHidden: true,
      passError: '',
      errorMsg: '',
      successMsg: '',
      valid: true,
      validation: {
        required: value => !!value || 'This field is required',
        email: value => {
          // eslint-disable-next-line no-useless-escape
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid Email Address';
        },
      },
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters('auth', { user: 'user' }),
    hasPassError() {
      return !!this.passError
    },
    item() {
      const { User } = this.$FeathersVuex.api
      const emptyUser = {
        admin: {},
        coach: {},
        qualifications: {
          policeClearance: {},
          WWC: {},
          medClearance: {},
          vaccination: {}
        },
        address: {}
      }
      return new User({ ...emptyUser, ...this.user })
    },
  },
  methods: {
    ...mapActions('users', { patchUser: 'patch' }),
    handleSave() {
      this.editing = false;
      this.setSuccess('Changes have been saved.');
    },
    async savePassword() {
      try {
        await this.$store.dispatch('auth/authenticate', {
          strategy: 'local',
          email: this.user.email,
          password: this.currentPass
        });
        await this.patchUser([this.user._id, {
            password: this.newPass
        }])
        this.passwordDialog = false
        this.setSuccess('Password updated')
      } catch (error) {
        console.error(error)
        this.passError = error.message
      }
    },
    setSuccess(message) {
      this.successMsg = message;
      this.alert = true;
      setTimeout(() => {
        this.successMsg = '';
        this.alert = false;
      }, 4000);
    },
    handleCancel() {
      this.editing = false;
      this.setSuccess('Changes have been discarded.');
    },
  },
};
</script>
