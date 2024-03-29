<template>
  <v-main>
    <component :is="registerScreen">
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
        <h1 class="mb-10 text-h4">Register</h1>
          <v-form
            ref="form"
            v-if="email"
            v-model="valid"
            @keyup.native.enter="valid && register($event)"
            style="min-width: 55%;"
          >
            <label class="v-label ml-6 theme--dark">EMAIL</label>
            <v-text-field
              ref="email"
              flat
              single-line
              rounded
              solo-inverted
              color="#c22032"
              autocapitalize="off"
              name="email"
              type="text"
              class="mb-2 mt-1"
              :value="email"
              :disabled="true"
            />

            <label class="v-label ml-6 theme--dark">PASSWORD</label>
            <v-text-field
              flat
              single-line
              rounded
              solo-inverted
              name="password"
              class="mb-2 mt-1"
              color="#c22032"
              v-model="password"
              :rules="[rules.required]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :disabled="loading"
              @click:append="show = !show"
              autocomplete="new-password"
            />

            <label class="v-label ml-6 theme--dark">CONFIRM PASSWORD</label>
            <v-text-field
              flat
              single-line
              rounded
              solo-inverted
              validate-on-blur
              name="confirmPassword"
              class="mb-2 mt-1"
              color="#c22032"
              v-model="passwordMatch"
              :rules="[rules.required, comparePasswords]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :disabled="loading"
              @click:append="show = !show"
              autocomplete="new-password"
            />

            <v-col class="text-center py-0">
              <v-btn
                large
                rounded
                depressed
                name="register"
                class="my-3 px-12 white--text"
                color="#c22032"
                :disabled="!valid || loading"
                :loading="loading"
                @click.stop.prevent="register"
                >
                  register
                </v-btn>
              <v-spacer />
              <v-btn text small rounded name="login" :to="{path: '/login'}" color="#888">Already have an account</v-btn>
            </v-col>
          </v-form>
          <div v-else>
            <v-alert color="error">Could not load user invite</v-alert>
            <v-btn text small rounded name="login" :to="{path: '/login'}" color="#888">Back to login</v-btn>
          </div>
      </template>
    </component>
  </v-main>
</template>

<script>
  import { mapState } from 'vuex';

  import mobile from '../components/other/auth/Mobile.vue';
  import desktop from '../components/other/auth/Desktop.vue';
  import app from '../store/feathers-client'

  const authManagement = app.service("authManagement");

  export default {
    name: 'register-form',
    title: 'Register',
    data() {
      return {
        password: '',
        passwordMatch: '',
        valid: false,
        show: false,
        error: '',
        info: '',
        rules: {
          required: v => !!v || 'Password is required',
        },
      };
    },
    mounted() {
      if(this.$route?.query?.verifyToken) {
        const [ email ] = this.$route.query.verifyToken.split('___')
        if(!email) {
          this.error = 'Failed to verify token, please try again'
          this.$router.replace({'query': null})
        }
      }
    },
    computed: {
      ...mapState('auth', { loading: 'isAuthenticatePending' }),
      email() {
        if(!this.$route?.query?.verifyToken) return ''
        const [ email ] = this.$route.query.verifyToken.split('___')
        if(email) return window.atob(email);
        return ''
      },
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
      verifyToken() {
        if (!this.$route?.query?.verifyToken) return ''
        return this.$route.query.verifyToken.split('___')[1] ?? ''
      },
      registerScreen() {
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
      comparePasswords() {
        return (this.password === this.passwordMatch) || 'Passwords must match'
      } 
    },
    methods: {
      async register() {
        this.$refs.form.validate()
        if (this.valid) {
          try {
            await authManagement.create({
                action: 'verifySignupSetPasswordLong',
                value: {
                  token: this.verifyToken,
                  password: this.password
                }
            })
            this.info = 'Successfully registered'
            await this.$store.dispatch('auth/authenticate', {
              strategy: 'local',
              email: this.email,
              password: this.password
            });
            this.$router.push({ name: 'user-settings' });
          } catch (error) {
            console.error(error)
            switch(error.message) {
              case 'User not found.':
                this.error = "User not found (may already be registered)"
                break;
              default:
                this.error = error.message
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
