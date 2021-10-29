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
import dayjs from 'dayjs'

export default {
  props: {
    date: String
  },
  computed: {
    dayjsDate() {
      return dayjs(this.date)
    },
    formatTime() {
      return this.dayjsDate.format('h:mma')
    },
    dayNum() {
      return this.dayjsDate.date()
    },
    dayOrdinal() {
      if (this.dayNum > 3 && this.dayNum < 21) return 'th';
      switch (this.dayNum % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
    monthName() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return monthNames[this.dayjsDate.month()]
    },
    currentYear() {
      return dayjs().year()
    },
    dateYear() {
      return this.dayjsDate.year()
    }
  },
}
</script>