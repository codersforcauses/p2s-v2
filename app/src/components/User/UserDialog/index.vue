<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
  >
    <FeathersVuexFormWrapper :item="item">
      <template v-slot="{ clone, save }">
        <v-form v-model="valid" @submit.prevent="e => handleSubmit(e, save)">
          <v-card flat rounded="xl">
            <v-toolbar flat>
              <v-toolbar-title class="text-h6">{{ userId ? 'Edit' : 'Invite' }} User</v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="$emit('input')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-container class="px-8">
                <v-row v-if="!userId" no-gutters>
                  <v-col cols="12" tag="label" class="v-label pl-6">Name</v-col>
                  <v-col cols="12" class="pr-3 pt-1">
                    <v-text-field
                      v-model.trim="clone.name"
                      label="Name"
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
                </v-row>
                <v-row v-if="!userId" no-gutters>
                  <v-col cols="12" tag="label" class="v-label pl-6">Email</v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model.trim="clone.email"
                      label="email@p2srugbyworks.com"
                      type="email"
                      solo-inverted
                      flat
                      persistent-hint
                      validate-on-blur
                      rounded
                      class="mb-2 mt-1"
                      color="primary"
                      :disabled="loading"
                      :rules="[validation.required, validation.email]"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" tag="label">Role</v-col>
                  <v-col cols="6">
                    <v-checkbox
                      v-model="permissions"
                      value="admin"
                      label="Administrator"
                      color="primary"
                      class="ma-0 pa-0"
                      hide-details
                      @change="clone.admin.is = admin"
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
                      @change="clone.coach.is = coach"
                    />
                  </v-col>
                  <p v-if="!!permError" class="error--text text-caption pl-3">{{ permError }}</p>
                  <p v-else-if="!userId" class="grey--text text-caption pl-3">This can be changed later by an administrator.</p>
                </v-row>
                  <v-row no-gutters>
                  <v-expansion-panels flat hover class="my-2">
                    <v-expansion-panel>
                      <v-expansion-panel-header class="pa-0">Qualifications</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Clearance
                          title="Police Clearance"
                          :verified="clone.qualifications.policeClearance.verified"
                          :expiry="clone.qualifications.policeClearance.expiry"
                          @updateVerified="clone.qualifications.policeClearance.verified = $event"
                          @updateExpiry="clone.qualifications.policeClearance.expiry = $event"
                        />
                        <Clearance
                          title="Medical Clearance"
                          :verified="clone.qualifications.medClearance.verified"
                          :expiry="clone.qualifications.medClearance.expiry"
                          @updateVerified="clone.qualifications.medClearance.verified = $event"
                          @updateExpiry="clone.qualifications.medClearance.expiry = $event"
                        />
                        <Clearance
                          title="Working With Children Check"
                          :verified="clone.qualifications.WWC.verified"
                          :expiry="clone.qualifications.WWC.expiry"
                          @updateVerified="clone.qualifications.WWC.verified = $event"
                          @updateExpiry="clone.qualifications.WWC.expiry = $event"
                        />
                        <Clearance
                          title="Vaccination Status"
                          :verified="clone.qualifications.vaccination.verified"
                          :expiry="clone.qualifications.vaccination.expiry"
                          @updateVerified="clone.qualifications.vaccination.verified = $event"
                          @updateExpiry="clone.qualifications.vaccination.expiry = $event"
                        />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>
                <v-row align="center">
                  <v-col cols="9" class="pt-6 pr-10">
                    <v-alert
                      dismissible
                      dense
                      rounded="pill"
                      v-model="alert"
                      type="error"
                      name="alert"
                      class="ma-0"
                      transition="slide-y-transition"
                    >{{ error }}</v-alert>
                  </v-col>
                  <v-col cols="3" class="mt-3">
                    <v-btn
                      depressed
                      rounded
                      class="black--text ma-0"
                      style="float: right"
                      color="primary"
                      :disabled="!valid || loading || !!permError"
                      :loading="loading"
                      type="submit"
                    >{{ userId ? 'Update' : 'Invite' }} User</v-btn>
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
import Clearance from './Clearance.vue';

export default {
  components: { Clearance },
  name: 'UserDialog',
  props: {
    value: Boolean,
    userId: String
  },
  data: () => ({
    permissions: [],
    permError: ' ',
    alert: false,
    error: '',
    valid: false,
    loading: false,
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
      // validDate: value => dayjs(value, ['DD/MM/YYYY', 'YYYY-MM-DD']).isValid() || 'Date is not valid',
      // fileSize: value => !value || value.size < 2000000 || 'Document size should be less than 2 MB',
    },
  }),
  mounted() {
    if(this.item.admin.is) this.permissions.push('admin')
    if(this.item.coach.is) this.permissions.push('coach')
  },
  watch: {
    permissions(val) {
      this.permError = val.length === 0 ? 'Users must be either admin, coach or both' : undefined;
    },
  },
  computed: {
    admin() {
      return this.permissions.includes('admin')
    },
    coach() {
      return this.permissions.includes('coach')
    },
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
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
        }}
      if (this.userId) {
        const userData = User.getFromStore(this.userId)
        const user = new User({ ...emptyUser, ...userData })
        delete user.isVerified
        return user
      }
      return new User(emptyUser)
    },
  },
  methods: {
    handleSubmit(user, callback) {
      this.alert = false
      callback(user).then((savedUser) => this.handleSaveResponse(savedUser)).catch(err => this.handleErrorResponse(err))
    },
    handleSaveResponse(savedUser) {
      if (!this.userId) {
        this.$router.push({ path: `/users/${savedUser._id}` })
      }
      this.$emit('input')
    },
    handleErrorResponse(err) {
      this.error = err.message ? err.message : 'Could not update user'
      this.alert = true
    }
  },
};
</script>
