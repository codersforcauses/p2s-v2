<template>
  <Card title="Schools">
    <template v-slot:content>
      <v-card-subtitle class="pa-0">Current Schools</v-card-subtitle>
      <FeathersVuexFind v-slot="{ items: schools }" service="schools" :params="{ query: {} }">
        <div class="text-h2 primary--text">{{ schools.length || 0 }}</div>
      </FeathersVuexFind>
    </template>
    <template v-slot:actions>
      <v-btn text rounded color="primary" :to="{ name: 'view-schools' }">View All</v-btn>
      <v-spacer></v-spacer>
      <v-btn text rounded color="primary" @click="schoolDialog = true">
        <v-icon left>
          mdi-plus
        </v-icon>
        Create New</v-btn>
      <SchoolDialog v-model="schoolDialog" />
    </template>
  </Card>
</template>

<script>
import Card from '../../layout/Card.vue'
import SchoolDialog from '../SchoolDialog'

export default {
  components: {
    Card,
    SchoolDialog
  },
  data() {
    return {
      schoolDialog: false,
    };
  },
};
</script>
