<template>
  <Card title="Users">
    <template v-slot:content>
      <v-card-subtitle class="pa-0">Current Users</v-card-subtitle>
      <div class="d-flex">
        <div>
          <FeathersVuexFind v-slot="{ items: coaches }" service="users" :params="{ query: { 'coach.is': true } }">
            <div class="text-h2 primary--text text-center">{{ coaches.length || 0 }}</div>
          </FeathersVuexFind>
          <div class="text-body-1 text-center">Coaches</div>
        </div>
        <v-divider inset vertical class="pl-7"></v-divider>
        <div class="pl-7">
          <FeathersVuexFind v-slot="{ items: admins }" service="users" :params="{ query: { 'admin.is': true } }">
            <div class="text-h2 primary--text text-center">{{ admins.length || 0 }}</div>
          </FeathersVuexFind>
          <div class="text-body-1 text-center">Admins</div>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <v-btn text rounded color="primary" :to="{ name: 'view-users' }">View All</v-btn>
      <v-spacer></v-spacer>
      <v-btn text rounded color="primary" @click="inviteDialog = true">
        <v-icon left>
          mdi-email
        </v-icon>
        Invite
      </v-btn>
      <UserDialog v-model="inviteDialog" />
    </template>
  </Card>
</template>

<script>
import Card from '../../layout/Card.vue'
import UserDialog from '../UserDialog'

export default {
  components: {
    Card,
    UserDialog
  },
  data() {
    return {
      inviteDialog: false,
    };
  },
};
</script>
