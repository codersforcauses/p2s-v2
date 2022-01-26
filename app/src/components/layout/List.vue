<template>
  <v-skeleton-loader type="list-item-three-line@10" :loading="loading">
    <v-list two-line subheader>
      <v-list-item @click="$emit('openAction')">
        <v-icon color="primary">mdi-plus</v-icon>
        <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add {{ name }}</v-list-item-subtitle>
        <slot name="addDialog" />
      </v-list-item>
      <v-list-item-group v-model="selected" @change="$emit('makeSelection', items[selected])" mandatory color="primary">
        <template v-for="item in items">
          <v-list-item :key="item._id" @click="$emit('openDrawer')">
            <slot name="itemDisplay" :item="item" />
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-skeleton-loader>
</template>

<script>

export default {
  props: {
    name: String,
    items: Array,
    loading: Boolean
  }
}
</script>

// Usage:
// <UserList name="Staff" :items="users">
//   <template v-slot:itemDisplay="props">
//     <UserListDisplay :user="props.item" />
//   </template>
// </UserList>