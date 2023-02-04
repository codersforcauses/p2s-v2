<template>
  <v-text-field
    v-model="dateFormatted"
    label="Student Date of Birth"
    hint="DD/MM/YYYY"
    solo-inverted
    flat
    rounded
    color="primary"
    class="mb-2 mt-1"
    persistent-hint
    @blur="internalDate = dateFormatted"
    :rules="[validation.required, validation.validDate, validation.past, validation.tooYoung]"
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
        :active-picker.sync="activePicker"
        :max="new Date()
            .toISOString()
            .substr(0, 10)
        "
        no-title
        min="1970-01-01"
        @input="dateMenu = false"
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
    props: ['value'],
    data: () => ({
      dateMenu: false,
      activePicker: null,
      date: '01-01-2000',
      dateFormatted: '',
      validation: {
        required: (value) => !!value || 'This field is required',
        past: (value) =>
          dayjs(value, 'DD/MM/YYYY').isBefore(dayjs()) ||
          'Date must be in the past',
        tooYoung: (value) =>
          dayjs(value, 'DD/MM/YYYY').isBefore(dayjs().subtract(2, 'year')) ||
          'Child is too young',
        validDate: (value) =>
          dayjs(value, 'DD/MM/YYYY').isValid() || 'Invalid date',
      }
    }),
    mounted() {
      this.internalDate = this.value ? dayjs(this.value) : dayjs().subtract(12, 'years').format('YYYY-MM-DD')
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
          this.dateFormatted = parsed.isValid() ? parsed.format('DD/MM/YYYY') : ''
        }
      },
    },
    watch: {
      date(val) {
        const parsed = dayjs(val, 'YYYY-MM-DD')
        if (parsed.isValid()) {
          this.$emit('input', parsed.toDate())
        }
      },
      dateMenu (val) {
        if(val) setTimeout(() => {this.activePicker = 'YEAR'})
      },
    }
  }
</script>