<template>
  <v-card flat rounded="xl">
    <v-card-subtitle>Current Staff</v-card-subtitle>
    <div class="d-flex pl-4">
      <div>
        <FeathersVuexCount v-slot="{ total: numCoaches }" service="users" :params="{ query: {
          'coach.is': true
        } }">
          <div class="text-h2 primary--text text-center">{{ numCoaches }}</div>
        </FeathersVuexCount>
        <div class="text-body-1 text-center">Coaches</div>
      </div>
      <v-divider
        inset vertical
        class="pl-7"
      ></v-divider>
      <div class="d-flex-row pl-7">
        <FeathersVuexCount v-slot="{ total: numAdmins }" service="users" :params="{ query: {
          'admin.is': true
        } }">
          <div class="text-h2 primary--text text-center">{{ numAdmins }}</div>
        </FeathersVuexCount>
        <div class="text-body-1 text-center">Admins</div>
      </div>
    </div>
    <v-card-title primary-title class="primary--text text-h6 pb-0">Manage Staff</v-card-title>

    <v-card-text>
      View all the staff currently active
      <br />Invite a new member to P2S
    </v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="primary" :to="{ name: 'view staff' }">View All</v-btn>

      <v-btn text rounded color="primary" @click="inviteDialog = true">Add New</v-btn>
      <invite v-model="inviteDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    invite: () => ({
      component: import('./UserInvite.vue'),
    }),
  },
  data() {
    return {
      inviteDialog: false,
      isPending: true,
    };
  },
};
</script>
