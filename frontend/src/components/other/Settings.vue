<template>
  <div class="py-sm-5">
    <v-card flat rounded="xl" max-width="750" class="mx-auto">
      <FeathersVuexFormWrapper :item="user" watch>
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
                    :rules="[validation.required, validation.name]"
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
              <!-- <v-row no-gutters>
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
          </v-row> -->

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
                    placeholder="Password"
                    color="primary"
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
                    placeholder="Password"
                    color="primary"
                    v-model.trim="clone.address.state"
                  />
                </v-col>
              </v-row>

              <!-- <v-row dense v-if="clone.coach.is">
                <v-col cols="12" tag="label" class="v-label pl-6 rounded-lg mb-2">Clearences</v-col>
                <Clearence
                  title="WWCC"
                  :clearence="clone.coach.qualifications.WWC"
                  :editing="editing"
                  :loading="false"
                  @fileUploaded="handleUpload"
                />
                <Clearence
                  title="Police Clearence"
                  :clearence="clone.coach.qualifications.policeClearance"
                  :editing="editing"
                  :loading="false"
                />
                <Clearence
                  title="Medical Clearence"
                  :clearence="clone.coach.qualifications.medClearance"
                  :editing="editing"
                  :loading="false"
                />
              </v-row> -->

              <v-row dense v-if="clone.coach.is">
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
import { mapGetters } from 'vuex';
import { FeathersVuexFormWrapper } from 'feathers-vuex';
// import Clearence from './ClearenceCard.vue';

export default {
  name: 'UserSettings',
  title: 'User Settings',
  components: {
    FeathersVuexFormWrapper,
    // Clearence,
  },
  data() {
    return {
      editing: false,
      alert: false,
      errorMsg: '',
      successMsg: '',
      valid: true,
      validation: {
        required: value => !!value || 'This field is required',
        name: value => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
        email: value => {
          // eslint-disable-next-line no-useless-escape
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid Email Address';
        },
      },
    };
  },
  computed: {
    ...mapGetters('auth', { user: 'user' }),
  },
  methods: {
    handleSave() {
      this.editing = false;
      this.setSuccess('Changes have been saved.');
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
