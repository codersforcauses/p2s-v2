<template>
  <v-main>
    <component :is="resetScreen">
      <template #form>
        <v-alert
          dismissible
          v-model="hasError"
          type="error"
          name="alert"
          :tile="$vuetify.breakpoint.smAndDown"
          :class="alertClass"
          :transition="transitionClass"
          >{{ error }}</v-alert
        >
        <v-alert
          dismissible
          v-model="hasInfo"
          type="success"
          name="alert"
          :tile="$vuetify.breakpoint.smAndDown"
          :class="alertClass"
          :transition="transitionClass"
          >{{ info }}</v-alert
        >
        <h1 class="mb-10 text-h4">Reset password</h1>
        <v-form
          ref="form"
          v-model="valid"
          @keyup.native.enter="valid && reset($event)"
          style="min-width: 55%;"
        >
          <label class="v-label ml-6 theme--dark">EMAIL</label>
          <v-text-field
            flat
            single-line
            rounded
            solo-inverted
            color="#c22032"
            :suffix="getEmailSuffix"
            autocapitalize="off"
            name="email"
            type="text"
            class="mb-2 mt-1"
            v-model="user.email"
            :disabled="loading || hasToken"
            :rules="[rules.required]"
            autocomplete="uusername"
          />

          <label v-if="hasToken" class="v-label ml-6 theme--dark">NEW PASSWORD</label>
          <v-text-field
            v-if="hasToken"
            flat
            single-line
            rounded
            solo-inverted
            name="password"
            class="mb-2 mt-1"
            color="#c22032"
            v-model="user.password"
            :rules="[rules.required]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :disabled="loading"
            @click:append="showPassword = !showPassword"
            autocomplete="new-password"
          />

          <v-col class="text-center py-0">
            <v-btn
              large
              rounded
              depressed
              name="reset"
              class="my-3 px-12 white--text"
              color="#c22032"
              :disabled="!valid || loading"
              :loading="loading"
              @click.stop.prevent="reset"
              >
                Send
              </v-btn>
            <v-spacer />
            <v-btn text small rounded name="login" :to="{ name: 'login' }" color="#888">Remembered your password?</v-btn>
          </v-col>
        </v-form>
      </template>
    </component>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import mobile from '../components/other/auth/Mobile.vue';
import desktop from '../components/other/auth/Desktop.vue';
import app from '../store/feathers-client'

const authManagement = app.service("authManagement");

export default {
  name: 'password-reset',
  title: 'Reset Password',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      valid: false,
      showPassword: false,
      info: '',
      error: '',
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+/.test(v) || 'Email must be valid',
      },
    };
  },
  async mounted() {
    if(this.$route.query.resetToken) {
      const [ email ] = this.$route.query.resetToken.split('___')
      if(email) {
          this.user.email = window.atob(email);
      } else {
        this.error = 'Failed to verify reset token, please try again'
        this.$router.replace({'query': null})
      }
    }
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    hasError: {
      get() {
        return !!this.error
      },
      set(showError) {
        if (!showError) this.error = ''
      }
    },
    hasInfo: {
      get() {
        return !!this.info
      },
      set(showInfo) {
        if (!showInfo) this.info = ''
      }
    },
    hasToken: {
      get() {
        return !!this.resetToken
      },
      set(val) {
        if (!val) this.$router.replace({'query': null})
      }
    },
    resetToken() {
      if (!this.$route?.query?.resetToken) return ''
      const [, ...splitToken] = this.$route.query.resetToken.split('___')
      return splitToken.join('___')
    },
    resetScreen() {
      return this.$vuetify.breakpoint.smAndDown ? mobile : desktop;
    },
    alertClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'alert_small' : 'alert_large';
    },
    transitionClass() {
      return this.$vuetify.breakpoint.smAndDown
        ? 'slide-y-reverse-transition'
        : 'slide-y-transition';
    },
    getEmailSuffix() {
      return this.user.email.includes('@') ? '' : '@p2srugbyworks.com'
    }
  },
  methods: {
    ...mapActions('users', { findUser: 'find'}),
    async reset() {
      this.$refs.form.validate()
        if (this.valid) {
          try {
            if(this.hasToken) {
              await authManagement.create({
                action: 'resetPwdLong',
                value: {
                  token: this.resetToken,
                  password: this.user.password
                }
              })
              this.info = 'Password has been reset'
              await this.$store.dispatch('auth/authenticate', {
                strategy: 'local',
                email: this.user.email,
                password: this.user.password
              });
              this.$router.push({ name: 'dashboard' });
            } else {
              await authManagement.create({
                action: 'sendResetPwd',
                value: {email: `${this.user.email}${this.getEmailSuffix}`},
              })
              this.info = 'Password reset link sent to email'
            }
          } catch (error) {
            console.error(error)
            this.error = error.message
            if (error.message === 'Password reset token has expired.') {
              this.hasToken = false
            }
          }
        }
    },
  },
};
</script>

<style scoped>
.alert_large {
  border: 0;
  border-radius: 999px;
  top: 10vh;
  left: 10vw;
  right: 10vw;
  margin: 3rem 0 0;
  min-width: calc(100% - 20vw);
  position: absolute;
}
.alert_small {
  border: 0;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: 0;
  z-index: 10 !important;
}
</style>
