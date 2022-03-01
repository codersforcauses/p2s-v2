<template>
  <v-card flat class="mx-4 my-6">
    <v-card-title class="pb-0">Coaches</v-card-title>
    <v-card-text v-if="!registeredCoaches.length">No Coaches Found</v-card-text>
    <v-skeleton-loader type="list-item-two-line@10" :loading="!registeredCoaches">
      <v-list two-line subheader flat>
        <v-card-subtitle v-show="registeredCoaches.length" class="py-0">
          Select coach for more info
        </v-card-subtitle>
        <v-list-item-group color="primary" v-model="selectedUser">
          <template v-for="coach in registeredCoaches">
            <ListItem
              :key="coach._id"
              :user="coach"
            />
          </template>
        </v-list-item-group>
        <v-btn text color="primary" @click="coachAddDialog = true"
          ><v-icon>mdi-plus</v-icon>Edit Coaches</v-btn
        >
        <AssignCoaches v-model="coachAddDialog" :session="session" @update="updateAttending($event)" />
      </v-list>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import AssignCoaches from './AssignCoaches';
import ListItem from './ListItem.vue';

export default {
  components: {
    AssignCoaches,
    ListItem,
  },
  props: {
    session: Object,
    registeredCoaches: Array,
    value: Object
  },
  data: () => ({
    coachAddDialog: false,
  }),
  computed: {
    selectedUser: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('setSelectedUser', val)
      }
    }
  },
  methods: {
    ...mapActions('sessions', { updateSession: 'patch' }),
    updateAttending(coaches) {
      this.updateSession([this.session._id, { coaches }]);
    },
  },
};
</script>