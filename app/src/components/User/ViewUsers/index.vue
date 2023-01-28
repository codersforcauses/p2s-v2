<template>
  <v-sheet rounded="xl" class="py-3">
    <BasicSearch @setSearch="setSearch" />
    <UserList v-model="selectedUser" @selected="setUser" :users="users" :loading="loading" @close="closeDrawer" />
    <InfoPanel v-model="drawer">
        <template v-slot:content>
          <UserInfo v-if="selectedUser" :user="selectedUser" @close="closeDrawer" />
        </template>
        <template v-slot:actions v-if="selectedUser && adminUser">
          <v-btn color="primary" outlined rounded @click="editUserDialog = true"><v-icon>mdi-pencil</v-icon>Edit User</v-btn>
          <UserDialog v-model="editUserDialog" :userId="selectedUser._id" />
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-2" outlined rounded @click="deleteUserDialog = true"><v-icon>mdi-trash-can</v-icon>Delete User</v-btn>
          <DeleteDialog v-model="deleteUserDialog" :user="selectedUser" />
        </template>
    </InfoPanel>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex'

import UserInfo from './UserInfo';
import UserList from './UserList';
import DeleteDialog from "./DeleteDialog";
import UserDialog from '../UserDialog'
import InfoPanel from "../../other/InfoPanel.vue";
import BasicSearch from '../../forms/BasicSearch.vue';
import UserRoleMixin from '../../../utils/userRole.mixin'

export default {
  name: 'view-users',
  title: 'View Users',
  components: {
    UserInfo,
    UserList,
    UserDialog,
    InfoPanel,
    DeleteDialog,
    BasicSearch,
  },
  mixins: [UserRoleMixin],
  data() {
    return {
      selectedUser: null,
      drawer: false,
      editUserDialog: false,
      deleteUserDialog: false,
      searchFilter: '',
      loading: false
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
        $sort: {
          name: 1,
        },
      }
    },
    users() {
      const { User } = this.$FeathersVuex.api;
      const { data } = User.findInStore({ query: this.query });
      return data.filter(i =>
        this.searchFilter.split(' ').every(s =>
          `${i.name} ${i.email} ${i.coach.is ? 'coach' : ''} ${i.admin.is ? 'admin' : ''}`
          .toLowerCase().includes(s)
        ));
    },
  },
  methods: {
    ...mapActions('users', { getUser: 'get' }),
    async loadUsers() {
      const { User } = this.$FeathersVuex.api;
      await this.$try(User.find({
        query: {
          _id: { $nin: this.users.map(s => s._id) },
          ...this.query
        },
      }));
    },
    closeDrawer() {
      this.drawer = false
    },
    setSearch(name) {
      this.searchFilter = name
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
    },
    query: {
      handler() {
        this.loadUsers();
      },
      immediate: true,
    },
  }
};
</script>
