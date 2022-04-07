<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
  >
    <v-card flat rounded="xl">
      <v-toolbar flat>
        <v-toolbar-title class="text-h6">{{ userId ? 'Edit' : 'Invite' }} User</v-toolbar-title>
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
              <v-col v-if="!userId" cols="12" tag="label" class="v-label pl-6">Name</v-col>
              <v-col v-if="!userId" cols="12" class="pr-3 pt-1">
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

              <v-col v-if="!userId" cols="12" tag="label" class="v-label pl-6">Email</v-col>
              <v-col v-if="!userId" cols="12">
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

              <v-col cols="12" tag="label" class="v-label pl-6 pb-3">Role</v-col>
              <v-row cols="12" class="ml-3">
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

              <v-expansion-panels v-if="permissions.includes('coach')" flat class="mb-2">
                <v-expansion-panel>
                  <v-expansion-panel-header>Qualifications</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-col cols="12" tag="label" class="v-label pl-6 pb-3 mt-5">Working With Children Check</v-col>
                    <v-col cols="8">
                      <v-file-input
                        label="Document"
                        solo-inverted
                        flat
                        show-size
                        color="primary"
                        accept="image/*"
                        append-icon="mdi-paperclip"
                        prepend-icon=""
                        :rules="fileSize"
                      ></v-file-input>
                    </v-col>              
                    <v-col cols="4">
                      <v-text-field
                        v-model="dateFormatted"
                        label="Session Date"
                        hint="DD/MM/YYYY"
                        solo-inverted
                        flat
                        rounded
                        color="primary"
                        class="mb-2 mt-1 rounded-xl"
                        persistent-hint
                        @change="clone.expiry = date ? date.toISOString() : null"
                        @blur="internalDate = dateFormatted"
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
                              @input="dateMenu = false; clone.date = date ? date.toISOString() : null"
                              color="primary"
                            ></v-date-picker>
                          </v-menu>
                        </template>
                      </v-text-field>
                    </v-col>              
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

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
                  :disabled="!valid || loading || !!permError"
                  :loading="loading"
                  type="submit"
                >{{ userId ? 'Update' : 'Invite' }} User</v-btn>
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

dayjs.extend(customParseFormat)
export default {
  name: 'UserDialog',
  props: {
    value: Boolean,
    userId: String
  },
  data: () => ({
    permissions: [],
    permError: ' ',
    date: dayjs(),
    dateFormatted: '',
    dateMenu: false,
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
      validDate: value => dayjs(value, ['DD/MM/YYYY', 'YYYY-MM-DD']).isValid() || 'Date is not valid',
      fileSize: value => !value || value.size < 2000000 || 'Document size should be less than 2 MB',
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
      const emptyUser = { admin: {}, coach: {}}
      if (this.userId) {
        const userData = User.getFromStore(this.userId)
        return new User({ ...emptyUser, ...userData })
      }
      return new User(emptyUser)
    },
  },
  methods: {
    handleSubmit(user, callback) {
      callback(user).then((savedUser) => this.handleSaveReponse(savedUser))
    },
    handleSaveReponse(savedUser) {
      if (!this.userId) {
        this.$router.push({ path: `/users/${savedUser._id}` })
      }
      this.$emit('input')
    }
  },
};
</script>
