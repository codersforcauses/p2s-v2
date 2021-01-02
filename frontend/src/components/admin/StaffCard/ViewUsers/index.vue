<template>
  <div class="py-6">
    <v-skeleton-loader type="list-item-three-line@10" :loading="!isPending">
      <v-list three-line subheader>
        <v-list-tile v-for="user in users" :key="user._id">
          <v-list-tile-content>
            <v-list-tile-title>{{ `${user.name.first} ${user.name.last}` }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ user.region }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <!-- <v-list-tile-action>
            <div>
              <v-icon :color="user.coach.is ? primary : 'grey'">mdi-football-australian</v-icon>
              <v-icon :color="user.admin.is ? primary : 'grey'">mdi-shield-account</v-icon>
            </div>
          </v-list-tile-action>-->
        </v-list-tile>
      </v-list>
    </v-skeleton-loader>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndUp"
      v-model="drawer"
      width="50%"
      mobile-breakpoint="xs"
      fixed
      clipped
      right
      disable-resize-watcher
      disable-route-watcher
      class="rounded-t-xl py-3 px-0"
    >
      <template #default>
        <user-info />
      </template>
    </v-navigation-drawer>
    <v-bottom-sheet v-else v-model="drawer" scrollable content-class="rounded-t-xl">
      <template #default>
        <user-info />
      </template>
    </v-bottom-sheet>
  </div>
</template>

<script>
import UserInfo from './UserInfo';

export default {
  name: 'view staff',
  title: 'View Staff',
  components: {
    UserInfo,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
