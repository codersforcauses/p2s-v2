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
        <v-toolbar-title class="text-h6">{{ schoolId ? 'Edit' : 'Create' }} School</v-toolbar-title>
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
              <v-col cols="12" tag="label" class="v-label pl-6">Name</v-col>
              <v-col cols="12" class="pr-3 pt-1">
                <v-text-field
                  v-model="clone.name"
                  label="School Name"
                  class="mb-2 mt-1"
                  solo-inverted
                  flat
                  rounded
                  type="text"
                  color="primary"
                  :disabled="loading"
                  :rules="[validation.required]"
                />
              </v-col>
              <v-col cols="12" tag="label" class="v-label pl-6">Address</v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="clone.address.street"
                  label="Street Address"
                  style="margin-right: 1px;"
                  class="mb-2 mt-1 rounded-r-0"
                  solo-inverted
                  flat
                  validate-on-blur
                  rounded
                  type="text"
                  color="primary"
                  :disabled="loading"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="clone.address.suburb"
                  label="Suburb"
                  class="mb-2 mt-1 rounded-l-0"
                  solo-inverted
                  flat
                  validate-on-blur
                  rounded
                  type="text"
                  color="primary"
                  :disabled="loading"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="clone.address.postcode"
                  label="Postcode"
                  style="margin-right: 1px;"
                  class="mb-2 mt-1 rounded-r-0"
                  solo-inverted
                  flat
                  validate-on-blur
                  rounded
                  type="number"
                  color="primary"
                  :disabled="loading"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="clone.address.state"
                  :items="stateList"
                  label="State"
                  class="pt-1 rounded-l-0"
                  solo-inverted
                  flat
                  filled
                  rounded
                  color="primary"
                  height="48"
                  dense
                />
              </v-col>
              <v-col cols="12" tag="label" class="v-label pl-6">Contact</v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="clone.contact.name"
                  label="Contact Name"
                  class="mb-2 mt-1"
                  solo-inverted
                  flat
                  validate-on-blur
                  rounded
                  type="text"
                  color="primary"
                  :disabled="loading"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="clone.contact.phoneNumber"
                  label="Phone Number"
                  class="mb-2 mt-1"
                  solo-inverted
                  flat
                  validate-on-blur
                  rounded
                  type="text"
                  color="primary"
                  :disabled="loading"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="clone.contact.email"
                  label="Email"
                  class="mb-2 mt-1"
                  solo-inverted
                  flat
                  validate-on-blur
                  rounded
                  type="email"
                  color="primary"
                  :disabled="loading"
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
                  :disabled="!valid || loading"
                  :loading="loading"
                  type="submit"
                >{{ schoolId ? 'Update' : 'Create' }} School</v-btn>
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
export default {
  name: 'SchoolDialog',
  props: {
    value: Boolean,
    schoolId: String
  },
  data: () => ({
    stateList: [
      'WA',
      'TAS',
      'VIC',
      'NSW',
      'SA',
      'NT',
      'ACT'
    ],
    loading: false,
    alert: false,
    error: '',
    valid: false,
    validation: {
      required: value => !!value || 'This field is required',
    },
  }),
  computed: {
    showDialog: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    item() {
      const { School } = this.$FeathersVuex.api

      const targetSchool = this.schoolId ? School.getFromStore(this.schoolId) : new School({ address: {}, contact: {}})
      return targetSchool
    },
  },
  methods: {
    handleSubmit(school, callback) {
      console.log(school)
      callback(school).then((savedSchool) => this.handleSaveReponse(savedSchool))
    },
    handleSaveReponse(savedSchool) {
      console.log(savedSchool)
      if (!this.schoolId) {
        this.$router.push({ path: `/schools/${savedSchool._id}` })
      }
      this.$emit('input')
    }
  }
}
</script>
