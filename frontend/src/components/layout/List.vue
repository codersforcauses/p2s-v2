<template>
  <v-list two-line subheader>
    <v-list-item @click="openCreateDialog">
      <v-icon color="primary">mdi-plus</v-icon>
      <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add Session</v-list-item-subtitle>
      <v-slot
    </v-list-item>
    <v-list-item-group v-model="selected" @change="selectSession" mandatory color="primary">
      <template v-for="session in sessions">
        <v-list-item :key="session._id" @click="$emit('open')">
          <v-list-item-content>
            <v-list-item-title class="text--primary">{{`${dayNum(session)}${dayOrdinal(session)} ${monthName(session)}`}}{{session.location ? ` - ${session.location}` : ''}}</v-list-item-title>
            <v-list-item-subtitle>{{`${formatTime(session)}, ${session.type}`}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>

export default {
  props: {
    items: Array
  }
}
</script>