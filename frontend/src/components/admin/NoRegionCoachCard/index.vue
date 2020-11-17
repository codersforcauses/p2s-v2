<template>
  <v-card flat rounded="xl">
    <!-- :color="`primary ${$vuetify.theme.dark ? 'darken-1' :'lighten-2'}`"> -->
    <!-- <v-skeleton-loader type="list-item, list-item-three-line@5" :loading="!isPending">
      <v-list three-line subheader class="pb-0">
        <v-subheader>Active Users</v-subheader>
        <v-list-tile v-for="user in users" :key="user._id">
          <v-list-tile-content>
            <v-list-tile-title>{{ `${user.name.first} ${user.name.last}` }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ user.region }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-skeleton-loader>-->

    <v-card-title
      primary-title
      class="primary--text text-h6 pb-0 d-flex align-center justify-space-between"
    >
      Manage Unassigned Coaches
      <br />
      <v-icon color="error" class="blink">mdi-alert-circle</v-icon>
    </v-card-title>

    <v-card-text>View all the coaches currently without an assigned region</v-card-text>

    <v-card-actions class="py-1">
      <v-btn text rounded color="secondary" :to="{ name: 'admin users' }">View All</v-btn>

      <v-btn text rounded color="secondary" @click="inviteDialog = true">Assign Coach</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mapGetters, mapActions, mapState } from 'vuex';

export default {
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

<style scoped>
@-webkit-keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@-o-keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.blink {
  -webkit-animation: blink 1.5s infinite; /* Safari 4+ */
  -moz-animation: blink 1.5s infinite; /* Fx 5+ */
  -o-animation: blink 1.5s infinite; /* Opera 12+ */
  animation: blink 1.5s infinite; /* IE 10+, Fx 29+ */
}
</style>
