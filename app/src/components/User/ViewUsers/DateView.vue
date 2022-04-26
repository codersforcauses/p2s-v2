<template>
  <div>
    <div class="d-flex">
      <div class="text-h5 primary--text">{{ dayNum }}</div>
      <div class="text-body-1 primary--text">{{ dayOrdinal }}</div>
    </div>
    <div class="subtitle-2 grey--text">{{ monthName }} {{ dateYear !== currentYear ? dateYear : ''}}</div>
  </div>
</template>

<script>
import dateUtils from '../../../utils/date'

export default {
  props: {
    date: String
  },
  mixins: [dateUtils],
}
</script>