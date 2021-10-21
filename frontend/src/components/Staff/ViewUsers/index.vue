<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: users, isFindPending: isPending, queryInfo: info }"
      service="users"
      :params="{ query }"
      watch="params"
    >
      <div>
        <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
          <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
            <v-btn icon color="primary" :disabled="skip === 0" @click="skip -= limit">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <span>Page {{skip/limit+1}}</span>
            <v-btn icon color="primary" :disabled="skip + limit >= info.total" @click="skip += limit">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
        <v-skeleton-loader type="list-item-three-line@10" :loading="isPending">
          <v-list three-line subheader>
            <v-list-item-group v-model="selected" mandatory color="primary">
              <template v-for="user in users">
                <v-list-item :key="user._id" @click="drawer = true">
                  <v-list-item-content>
                    <v-list-item-title class="text--primary">{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle>
                      {{ user.admin.is ? 'admin' : null }}
                      <span v-show="user.admin.is && user.coach.is">&bull;</span>
                      {{ user.coach.is ? 'coach' : null }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-skeleton-loader>
        <info-panel v-model="drawer">
           <user-info :user="users[selected]" />
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import UserInfo from './UserInfo';
import InfoPanel from "../../other/InfoPanel.vue";

export default {
  name: 'view-staff',
  title: 'View Staff',
  components: {
    UserInfo,
    InfoPanel
  },
  data() {
    return {
      selected: 0,
      drawer: false,
      limit: 10,
      skip: 0
    };
  },
  computed: {
    query() {
      return {
        $limit: this.limit,
        $skip: this.skip,
        $sort: {
          name: 1,
        },
      }
    }
  }
};
</script>
