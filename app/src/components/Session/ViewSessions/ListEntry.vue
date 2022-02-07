<template>
  <v-list-item-content>
    <FeathersVuexGet 
      v-slot="{ item: school }"
      service="schools"
      :id="session.school"  
    >
    <v-list-item-title class="text--primary">{{`${dayNum}${dayOrdinal} ${monthName}`}}{{session.school ? ` - ${school.name}` : ''}}</v-list-item-title>
    </FeathersVuexGet>
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