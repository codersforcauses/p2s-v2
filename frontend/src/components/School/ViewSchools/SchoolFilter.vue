<template>
  <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
    <div class="d-flex justify-space-between align-center">
      <slot />
      <SkipSelect :limit="limit" v-model="pageSkip" :queryInfo="queryInfo" />
    </div>
  </div>
</template>

<script>
import SkipSelect from '../../other/SkipSelect.vue';

export default {
  components: { SkipSelect },
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