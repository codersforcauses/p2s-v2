<template>
  <v-list-item-content>
    <v-list-item-title class="text--primary">{{`${dayNum}${dayOrdinal} ${monthName}`}}{{session.location ? ` - ${session.location}` : ''}}</v-list-item-title>
    <v-list-item-subtitle>{{`${formatTime}, ${session.type}`}}</v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
import dateUtils from '../../../utils/date'

export default {
  props: {
    session: Object
  },
  computed: {
    date() {
      return this.session.date
    }
  },
  mixins: [ dateUtils ]
}
</script>