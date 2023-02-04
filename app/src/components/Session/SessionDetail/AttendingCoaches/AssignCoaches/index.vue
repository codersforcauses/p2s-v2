<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    style="position: relative;"
  >
    <v-card flat rounded="xl">
      <v-toolbar flat>
        <v-toolbar-title class="text-h6">Edit Coaches</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-toolbar flat>
        <BasicSearch @setSearch="setSearch" />
      </v-toolbar>
      <v-card-text>
        <CoachList :session="session" :coaches="filteredUsers" @update="$emit('update', $event)" />
      </v-card-text>

      <v-card-actions class="ma-0 pa-0">
        <v-btn class="pa-0 ma-0 rounded-b-xl" color="primary" width="100%" height="40px" @click="$emit('input')">
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

import CoachList from './CoachList.vue';
import BasicSearch from '../../../../forms/BasicSearch';

export default {
  mixins: [makeFindMixin({ service: 'users', watch: true })],
  components: { 
    CoachList,
    BasicSearch
  },
  props: {
    value: Boolean,
    session: Object
  },
  data: () => ({
    searchFilter: '',  
  }),
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    filteredUsers() {
      return this.users.filter(user =>
        this.searchFilter.split(' ').every(s =>
          `${user.name} ${user.address}`
          .toLowerCase().includes(s)
        ));
    },
    usersParams() {
      return {
        $sort: {
          name: 1,
        },
        "coach.is": true,
      };
    },
  },
  methods: {
    setSearch(name) {
      this.searchFilter = name
    },
  }
};
</script>
