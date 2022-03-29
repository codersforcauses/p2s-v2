<template>
  <v-text-field
    v-model="dateFormatted"
    label="Session Date"
    hint="DD/MM/YYYY"
    solo-inverted
    flat
    rounded
    color="primary"
    class="mb-2 mt-1 rounded-l-xl rounded-r-0"
    persistent-hint
    @change="saveDate"
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
          @input="saveDate"
          color="primary"
        ></v-date-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export default {
  name: 'date-select',
  props: {
    value: String, // ISO Date String
  },
  data: () => ({
    date: null,
    menu: false,
    validation: {
      required: value => !!value || 'This field is required',
      validDate: value => dayjs(value, ['DD/MM/YYYY', 'YYYY-MM-DD']).isValid() || 'Date is not valid',
    },
  }),
  mounted() {
    this.date = this.value ? dayjs(this.value) : dayjs()
  },
  computed: {
    internalDate: {
      get() {
        return this.date.format('YYYY-MM-DD');
      },
      set(val) {
        const parsed = dayjs(val, 'YYYY-MM-DD')
        if(parsed.isValid()) this.date = this.date.day(parsed.day()).month(parsed.month()).year(parsed.year())
      }
    },
    externalDate: {
      get() {
        return this.date.format('DD/MM/YYYY');
      },
      set(val) {
        const parsed = dayjs(val, 'DD/MM/YYYY')
        if(parsed.isValid()) this.date = this.date.day(parsed.day()).month(parsed.month()).year(parsed.year())
      }
    }
  },
  methods: {
    saveDate() {
      this.menu = false;
      this.$emit('input', this.date.toISOString());
    }
  }
}
</script>