<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: users, isFindPending: isPending, queryInfo: info }"
      service="users"
      :params="{ query }"
      watch="params"
    >
      <div>
        <UserFilter :skip="listSkip" @setSkip="setSkip" :limit="listLimit" :queryInfo="info"/>
        <UserList v-model="selectedUser" @selected="setUser" :users="users" :isPending="isPending" @close="closeDrawer" />
        <InfoPanel v-model="drawer">
           <UserInfo v-if="selectedUser" :user="selectedUser" @close="closeDrawer" />
           <v-card-actions v-if="selectedUser">
              <v-btn color="primary" text rounded @click="editUserDialog = true">Edit User</v-btn>
              <UserDialog v-model="editUserDialog" :userId="selectedUser._id" />
          </v-card-actions>
        </InfoPanel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex'

import UserInfo from './UserInfo';
import UserFilter from './UserFilter';
import UserList from './UserList';
import UserDialog from '../UserDialog'
import InfoPanel from "../../other/InfoPanel.vue";

export default {
  name: 'view-users',
  title: 'View Users',
  components: {
    UserInfo,
    UserFilter,
    UserList,
    UserDialog,
    InfoPanel,
  },
  data() {
    return {
      selectedUser: null,
      drawer: false,
      editUserDialog: false,
      listLimit: 20,
      listSkip: 0
    };
  },
  async mounted() {
    if(this.$route.params.id) {
      this.selectedUser = await this.getUser(this.$route.params.id)
      this.drawer = true
    }
  },
  computed: {
    query() {
      return {
        $limit: this.listLimit,
        $skip: this.listSkip,
        $sort: {
          name: 1,
        },
      }
    }
  },
  methods: {
    ...mapActions('users', { getUser: 'get' }),
    closeDrawer() {
      this.drawer = false
    },
    setSkip(skip) {
      this.listSkip = skip
    },
    setUser(user) {
      this.selectedUser = user;
      this.drawer = true;
    }
  },
  watch: {
    selectedUser() {
      if(!this.selectedUser) this.drawer = false
    },
    drawer() {
      if(!this.drawer) {
        setTimeout(() => {
          this.selectedUser = null;
        }, 50)
      }
    }
  }
};
</script>
