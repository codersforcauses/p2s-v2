<template>
  <v-main>
    <component :is="loginScreen">
      <template #form>
        <v-alert
          dismissible
          v-model="alert"
          type="error"
          name="alert"
          :tile="$vuetify.breakpoint.smAndDown"
          :class="alertClass"
          :transition="transitionClass"
          >{{ error }}</v-alert
        >
        <h1 class="mb-10 text-h4">Login</h1>
        <v-form
          v-model="valid"
          @keyup.native.enter="valid && login($event)"
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
            :disabled="loading"
            :rules="[rules.required]"
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
            v-model="user.password"
            :rules="[rules.required]"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :disabled="loading"
            @click:append="show = !show"
          />

          <v-col class="text-center py-0">
            <v-btn
              large
              rounded
              depressed
              name="login"
              class="my-3 px-12 white--text"
              color="#c22032"
              :disabled="!valid || loading"
              :loading="loading"
              @click.stop.prevent="login"
              >
                Login
              </v-btn>
            <v-spacer />
            <v-btn text small rounded name="forgotPass" color="#888">Forgot Password?</v-btn>
          </v-col>
        </v-form>
      </template>
    </component>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';
import mobile from '../components/other/auth/Mobile.vue';
import desktop from '../components/other/auth/Desktop.vue';

export default {
  name: 'login-form',
  title: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      valid: false,
      show: false,
      alert: false,
      error: '',
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+/.test(v) || 'Email must be valid',
      },
    };
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    loginScreen() {
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
    async login() {
      if (this.valid) {
        try {
          await this.$store.dispatch('auth/authenticate', {
            strategy: 'local',
            ...this.user,
            email: `${this.user.email}${this.getEmailSuffix}`,
          });
          this.$router.push({ name: 'dashboard' }).catch((err) => console.log(`[nav] rerouting from ${err.to.path}`));
        } catch (error) {
          this.alert = true;
          this.error = error.message ?? 'Failed to authenticate'
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
