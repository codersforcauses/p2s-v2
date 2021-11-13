<template>
  <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
    <v-btn icon color="primary" :disabled="listSkip === 0" @click="listSkip -= listLimit">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span>Page {{listSkip/listLimit+1}}</span>
    <v-btn icon color="primary" :disabled="listSkip + listLimit >= queryInfo.total" @click="listSkip += listLimit">
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