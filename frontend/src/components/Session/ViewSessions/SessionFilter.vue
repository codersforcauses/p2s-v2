<template>
  <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
    <div class="d-flex justify-space-between">
      <div>
        <v-tabs v-model="selectedTab">
          <v-tab class="text-capitalize text-body-2">Future Sessions</v-tab>
          <v-tab class="text-capitalize text-body-2">Past Sessions</v-tab>
        </v-tabs>
      </div>
      <div class="d-flex align-center">
        <v-btn icon color="primary" :disabled="pageSkip === 0" @click="pageSkip -= limit">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span width="20px">Page {{pageSkip/limit+1}}</span>
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
    queryInfo: Object,
    tab: Number
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
    selectedTab: {
      get() {
        return this.tab
      },
      set(val) {
        this.$emit('setTab', val)
      }
    }
  }
}
</script>