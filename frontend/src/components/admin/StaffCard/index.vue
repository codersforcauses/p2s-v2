<template>
  <v-card flat rounded="xl">
    <v-skeleton-loader type="list-item, list-item-three-line@5" :loading="!isPending">
      <v-list three-line subheader class="pb-0">
        <v-subheader>Active Users</v-subheader>
        <v-list-tile v-for="user in users" :key="user._id">
          <v-list-tile-content>
            <v-list-tile-title>{{ `${user.name.first} ${user.name.last}` }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ user.region }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <div>
              <v-icon :color="user.coach.is ? primary : 'grey'">mdi-football-australian</v-icon>
              <v-icon :color="user.manager.is ? primary : 'grey'">mdi-account-tie</v-icon>
              <v-icon :color="user.admin.is ? primary : 'grey'">mdi-shield-account</v-icon>
            </div>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-skeleton-loader>

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
// import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  components: {
    invite: () => ({
      component: import('./UserInvite.vue'),
    }),
  },
  data() {
    return {
      inviteDialog: false,
      finished: false,
    };
  },
  mounted() {
    // console.log('hello');
    // this.findUsers({
    //   query: {
    //     $sort: {
    //       updatedAt: -1,
    //     },
    //     $select: ['name', 'region', 'email', 'coach', 'admin', 'manager'],
    //   },
    // }).then(response => {
    //   const regionIds = response.data.map(regionId => regionId.region);
    //   this.findRegions({
    //     query: {
    //       _id: {
    //         $in: regionIds,
    //       },
    //     },
    //   });
    //   this.finished = true;
    // });
  },
  computed: {
    // ...mapState('users', { isFindPendingUsers: 'isFindPending' }),
    // ...mapState('regions', { isGetPendingRegions: 'isGetPending' }),
    // ...mapGetters('users', { findUsersInStore: 'find' }),
    // ...mapGetters('regions', { getRegionInStore: 'get' }),
    //   isPending() {
    //     return this.isFindPendingUsers || this.isGetPendingRegions;
    //   },
    //   users() {
    //     if (this.finished) {
    //       const users = this.findUsersInStore({
    //         query: {
    //           $limit: 5,
    //           $sort: {
    //             updatedAt: -1,
    //           },
    //           _id: {
    //             $ne: this.$store.state.auth.payload.userId,
    //           },
    //         },
    //       }).data;
    //       const usersWithRegion = users.map(user => {
    //         const region = this.getRegionInStore(user.region);
    //         return {
    //           ...user,
    //           region: region === undefined ? 'Region Unassigned' : region.name,
    //         };
    //       });
    //       return usersWithRegion;
    //     }
    //     return false;
    //   },
  },
  // methods: {
  //   ...mapActions('users', { findUsers: 'find' }),
  //   ...mapActions('regions', { findRegions: 'find' }),
  // },
};
</script>
