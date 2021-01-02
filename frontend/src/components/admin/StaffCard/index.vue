<template>
  <v-card flat rounded="xl">
    
    <div class="d-flex pl-4 pt-5">
      <div>
        <div class="text-h2 primary--text text-center">{{ numCoaches }}</div>
        <div class="text-body-1 text-center">Coaches</div>
      </div>
      <v-divider
        inset vertical
        class="pl-5"
      ></v-divider>
      <div class="d-flex-row pl-5">
        <div class="text-h2 primary--text text-center">{{ numAdmins }}</div>
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
// import { mapGetters, mapActions, mapState } from 'vuex';
import users from '../../../seeds'

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
      users
    };
  },
  mounted() {
    // console.log('hello');
    // this.findUsers({
    //   query: {
    //     $sort: {
    //       updatedAt: -1,
    //     },
    //     $select: ['name', 'region', 'email', 'coach', 'admin'],
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
    numCoaches() {
      return this.users.reduce((numUsers, user) => {
        if(user?.coach?.is) return numUsers + 1
        return numUsers
      }, 0)
    },
    numAdmins() {
      return this.users.reduce((numUsers, user) => {
        if(user?.admin?.is) return numUsers + 1
        return numUsers
      }, 0)
    }
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
