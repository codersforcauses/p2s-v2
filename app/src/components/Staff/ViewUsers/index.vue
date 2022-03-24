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
        <info-panel v-model="drawer">
           <UserInfo v-if="selectedUser" :user="selectedUser" @close="closeDrawer" />
        </info-panel>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import UserInfo from './UserInfo';
import UserFilter from './UserFilter';
import UserList from './UserList';
import InfoPanel from "../../other/InfoPanel.vue";

export default {
  name: 'view-users',
  title: 'View Staff',
  components: {
    UserInfo,
    UserFilter,
    UserList,
    InfoPanel,
  },
  data() {
    return {
      selectedUser: null,
      drawer: false,
      listLimit: 20,
      listSkip: 0
    };
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
