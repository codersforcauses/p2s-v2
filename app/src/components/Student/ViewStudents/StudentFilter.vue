<template>
  <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
    <div class="d-flex justify-space-between align-center">
      <v-btn icon disabled class="ml-3"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-select v-model="yearSelected" :items="years" item-text="text" item-value="value" label="School Year"></v-select>
      <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
        <v-btn icon color="primary" :disabled="pageSkip === 0" @click="pageSkip -= limit">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span>Page {{skip/limit+1}}</span>
        <v-btn icon color="primary" :disabled="pageSkip + limit >= queryInfo.total" @click="pageSkip += limit">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skip: Number,
    limit: Number,
    queryInfo: Object
  },
  data() {
    return {
      yearSelect: null,
      years: [
        { text: "All Years", value: null },
        { text: "Year 8", value: 8 },
        { text: "Year 9", value: 9 },
        { text: "Year 10", value: 10 },
        { text: "Year 11", value: 11 },
        { text: "Year 12", value: 12 },
      ]
    };
  },
  computed: {
    pageSkip: {
      get() {
        return this.skip
      },
      set(val) {
        this.$emit('setSkip', val)
      }
    },
    yearSelected: {
      get() {
        return this.yearSelect
      },
      set(val) {
        this.$emit('setYear', val)
      }
    }
  }
}
</script>