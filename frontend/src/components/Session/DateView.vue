<template>
  <div class="d-flex-row pl-5">
    <div class="d-flex">
      <div class="text-h2 primary--text">{{ dayNum }}</div>
      <div class="text-h5 primary--text">{{ dayOrdinal }}</div>
    </div>
    <div class="text-body-1">{{ monthName }} {{ dateYear !== currentYear ? dateYear : ''}}</div>
  </div>
</template>

<script>
import dateUtils from '../../utils/date'

export default {
  props: {
    date: String
  },
  mixins: [dateUtils],
}
</script>