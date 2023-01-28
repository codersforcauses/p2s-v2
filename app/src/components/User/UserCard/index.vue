<template>
  <v-card flat rounded="xl">
    <v-card-subtitle>Current Users</v-card-subtitle>
    <div class="d-flex pl-4">
      <div>
        <FeathersVuexFind v-slot="{ items: coaches }" service="users" :params="{ query: {
          'coach.is': true
        } }">
          <div class="text-h2 primary--text text-center">{{ coaches.length || 0 }}</div>
        </FeathersVuexFind>
        <div class="text-body-1 text-center">Coaches</div>
      </div>
      <v-divider
        inset vertical
        class="pl-7"
      ></v-divider>
      <div class="d-flex-row pl-7">
        <FeathersVuexFind v-slot="{ items: admins }" service="users" :params="{ query: {
          'admin.is': true
        } }">
          <div class="text-h2 primary--text text-center">{{ admins.length || 0 }}</div>
        </FeathersVuexFind>
        <div class="text-body-1 text-center">Admins</div>
      </div>
    </div>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Users</v-card-title>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" :to="{ name: 'view-users' }">View All</v-btn>

      <v-btn text rounded color="primary" @click="inviteDialog = true">Invite User</v-btn>
      <UserDialog v-model="inviteDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>
import UserDialog from '../UserDialog'

export default {
  components: {
    UserDialog
  },
  data() {
    return {
      inviteDialog: false,
      isPending: true,
    };
  },
};
</script>
