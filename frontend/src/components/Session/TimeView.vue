<template>
  <div class="d-flex">
    <div class="text-h2 primary--text">{{ getTime }}</div>
    <div class="text-h5 primary--text">{{ getAMPM }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    date: String
  },
  computed: {
    dayjsDate() {
      return dayjs(this.date)
    },
    getTime() {
      return this.dayjsDate.format('h:mm')
    },
    getAMPM() {
      return this.dayjsDate.format('a')
    },
  },
}
</script>