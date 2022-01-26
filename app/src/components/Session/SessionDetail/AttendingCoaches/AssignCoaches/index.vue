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
      <CoachFilter
        :filterName="searchName"
        @updateName="searchName = $event"
      />
      <v-card-text>
        <FeathersVuexFind
          v-slot="{ items: coaches }"
          service="users"
          :params="{ query }"
          watch="params"
        >
          <CoachList :session="session" :coaches="coaches" @update="$emit('update', $event)" />
        </FeathersVuexFind>
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
import CoachFilter from './CoachFilter.vue';
import CoachList from './CoachList.vue';

export default {
  components: { 
    CoachList,
    CoachFilter
   },
  props: {
    value: Boolean,
    session: Object
  },
  data: () => ({
    searchName: '',    
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
    query() {
      return {
        $sort: {
          name: 1,
        },
        "coach.is": true,
        $limit: 1000,
      };
    },
  },
};
</script>
