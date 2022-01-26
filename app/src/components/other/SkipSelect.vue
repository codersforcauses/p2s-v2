<template>
  <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
    <v-btn icon color="primary" :disabled="pageSkip === 0" @click="pageSkip -= limit">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span>Page {{pageSkip/limit+1}}</span>
    <v-btn icon color="primary" :disabled="pageSkip + limit >= queryInfo.total" @click="pageSkip += limit">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    skip: Number,
    limit: Number,
    queryInfo: Object
  },
  computed: {
    pageSkip: {
      get() {
        return this.skip
      },
      set(val) {
        this.$emit('setSkip', val)
      }
    }
  }
}
</script>