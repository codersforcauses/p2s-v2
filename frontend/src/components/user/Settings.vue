<template>
  <div class="py-sm-5">
    <v-card flat rounded="xl" max-width="750" class="mx-auto">
      <v-form v-model="valid" :readonly="!editing" @keyup.native.enter="createUser($event)">
        <v-container class="pa-5">
          <v-row no-gutters>
            <v-col cols="12" tag="label" class="v-label pl-6">NAME</v-col>
            <v-col cols="12">
              <v-text-field
                solo-inverted
                flat
                type="text"
                class="mb-2 mt-1"
                placeholder="Name"
                color="primary"
                :disabled="loading"
                :rules="[validation.required, validation.name]"
                v-model.trim="user.name"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col class="text-caption text--secondary">
              <span class="ml-6">WWC</span>
              <v-skeleton-loader type="image" height="128" class="rounded-xl">
                <!-- <img src="src" alt="alt"> -->
              </v-skeleton-loader>
            </v-col>
            <v-col class="text-caption text--secondary">
              <span class="ml-6">Police Clearance</span>
              <v-skeleton-loader type="image" height="128" class="rounded-xl">
                <!-- <img src="src" alt="alt"> -->
              </v-skeleton-loader>
            </v-col>
            <v-col class="text-caption text--secondary">
              <span class="ml-6">Medical Clearance</span>
              <v-skeleton-loader type="image" height="128" class="rounded-xl">
                <!-- <img src="src" alt="alt"> -->
              </v-skeleton-loader>
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
                v-show="editing"
                text
                rounded
                class="ma-0"
                style="float: left"
                color="primary"
                :loading="loading"
                @click.stop.prevent="editing = false"
              >Cancel</v-btn>
              <v-btn
                v-show="editing"
                depressed
                rounded
                class="ma-0"
                style="float: right"
                color="primary"
                :disabled="!valid || loading"
                :loading="loading"
                @click.stop.prevent="createUser"
              >Update</v-btn>
              <v-btn
                v-show="!editing"
                text
                rounded
                class="ma-0"
                style="float: right"
                color="primary"
                :loading="loading"
                @click.stop.prevent="editing = true"
              >Edit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'User Settings',
  title: 'User Settings',
  data() {
    return {
      editing: false,
      user: {
        name: {
          first: '',
          last: 'sfgsdfgsd',
        },
      },
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        name: value => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
      },
    };
  },
};
</script>

<style scoped>
</style>
