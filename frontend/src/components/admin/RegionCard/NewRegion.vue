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
        <v-toolbar-title class="text-h6">Create New Region</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" class="pa-4" @keyup.native.enter="valid && createRegion($event)">
        <label class="v-label pl-6">NAME</label>
        <v-text-field
          v-model.trim="region.name"
          solo-inverted
          flat
          persistent-hint
          rounded
          hint="Enter the new region's name"
          type="text"
          color="primary"
          class="mb-2 mt-1"
          :disabled="loading"
          :rules="[validation.required]"
        />

        <label class="v-label pl-6">STATE</label>
        <v-select
          v-model="region.state"
          solo-inverted
          flat
          persistent-hint
          rounded
          color="primary"
          hint="Enter the state the region belongs to"
          type="text"
          :class="`mb-2 mt-1 ${isStateFocused ? 'rounded-b-0' : ''}`"
          item-text="name"
          item-value="value"
          :items="states"
          :disabled="loading"
          :menu-props="{ offsetY: true, light: true, 'content-class': 'rounded-t-0 rounded-b-xl', transition: 'slide-y-transition'}"
          @focus="isStateFocused = true"
          @blur="isStateFocused = false"
        />

        <v-alert
          dismissible
          rounded="pill"
          v-model="alert"
          type="error"
          name="alert"
          class="ma-0"
          transition="slide-y-transition"
        >{{ error }}</v-alert>

        <v-btn
          depressed
          rounded
          class="ma-0"
          style="float: right"
          color="primary"
          :disabled="!valid || loading"
          :loading="loading"
          @click.stop.prevent="createRegion"
        >Create Region</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  props: ['value'],
  data() {
    return {
      region: {
        name: '',
        state: 'WA',
      },
      isStateFocused: false,
      states: [
        {
          name: 'Australian Capital Territory',
          value: 'ACT',
        },
        {
          name: 'New South Wales',
          value: 'NSW',
        },
        {
          name: 'Nothern Territory',
          value: 'NT',
        },
        {
          name: 'Queensland',
          value: 'QLD',
        },
        {
          name: 'South Australia',
          value: 'SA',
        },
        {
          name: 'Tasmania',
          value: 'TAS',
        },
        {
          name: 'Victoria',
          value: 'VIC',
        },
        {
          name: 'Western Australia',
          value: 'WA',
        },
      ],
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
  computed: {
    // ...mapState('regions', { loading: 'isCreatePending' }),
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    dark() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    async createRegion() {
      if (this.valid) {
        const { Region } = this.$FeathersVuex;
        const region = new Region(this.region);

        await region
          .create()
          .then(() => this.$emit('input'))
          .catch(err => {
            this.error = err.message
              .charAt(0)
              .toUpperCase()
              .concat(err.message.slice(1));
            this.alert = true;
          });
      }
    },
  },
};
</script>
