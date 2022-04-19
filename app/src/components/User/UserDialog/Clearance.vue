<template>
  <v-container>
    <v-row>
      <v-card-title class="subtitle-1 grey--text pa-0">{{ title }}</v-card-title>
    </v-row>
    <!-- <v-col cols="8">
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
    </v-col>               -->
    <v-row>
      <v-col cols="6" class="pa-0 pt-2">
        <v-checkbox
          v-model="internalVerified"
          label="Verified"
          color="primary"
          class="ma-0 pa-0"
          hide-details
        />
      </v-col>
      <v-col cols="6" class="pa-0">
        <v-text-field
          v-model="dateFormatted"
          label="Expiry"
          solo-inverted
          flat
          rounded
          dense
          color="primary"
          class="mb-2 mt-1 rounded-xl"
          persistent-hint
          @change="updateExpiry(internalDate)"
          @blur="internalDate = dateFormatted"
          :rules="[validation.validDate, validation.future]"
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
                max="2100-01-01"
                @input="dateMenu = false; updateExpiry(date ? date.toISOString() : null)"
                color="primary"
              ></v-date-picker>
            </v-menu>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export default {
  props: {
    title: String,
    verified: Boolean,
    expiry: String,
  },
  data: () => ({
    date: null,
    dateFormatted: '',
    dateMenu: false,
    validation: {
      required: (value) => !!value || 'This field is required',
      future: (value) =>
        (!value || dayjs(value, 'DD/MM/YYYY').isSame(dayjs()) || dayjs(value, 'DD/MM/YYYY').isAfter(dayjs())) ||
        'Date must be in the future',
      validDate: (value) =>
        (dayjs(value, 'DD/MM/YYYY').isValid() || !value) || 'Invalid date',
    },
  }),
  mounted() {
    if (this.expiry) {
      this.date = dayjs(this.expiry).format('YYYY-MM-DD')
    }
  },
  methods: {
    updateVerified(verified) {
      this.$emit('updateVerified', verified)
    },
    updateExpiry(expiry) {
      this.$emit('updateExpiry', expiry)
    },
  },
  computed: {
    internalDate: {
      get() {
        const parsed = dayjs(this.date, 'YYYY-MM-DD')
        return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
      },
      set(val) {
        const parsed = dayjs(val, ['DD/MM/YYYY', 'YYYY-MM-DD'])
        this.date = parsed.isValid() ? parsed : null
      }
    },
    internalVerified: {
      get() {
        return this.verified
      },
      set(val) {
        this.updateVerified(val)
      }
    },
  },
  watch: {
    date(val) {
      const parsed = dayjs(val, 'YYYY-MM-DD')
      if (parsed.isValid()) this.dateFormatted = parsed.format('DD/MM/YYYY')
    },
    dateMenu (val) {
      if(val) setTimeout(() => {this.activePicker = 'YEAR'})
    },
  }
}
</script>