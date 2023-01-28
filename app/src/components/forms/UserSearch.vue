<template>
  <FeathersVuexFind v-slot="{ items: users, isFindPending: isPending }" service="users" :params="searchParams" watch="params">
    <v-autocomplete
      v-model.trim="user"
      :loading="isPending"
      :items="users"
      :search-input.sync="search"
      color="primary"
      rounded
      flat
      cache-items
      chips
      multiple
      deletable-chips
      small-chips
      hide-selected
      style="padding-right: 1px;"
      :class="menuClasses"
      :filter="searchFilter"
      item-text="name"
      item-value="_id"
      label="Search for a user"
      solo-inverted
      :menu-props="{
        offsetY: true,
        light: dark,
        dark: !dark,
        transition: 'slide-y-transition',
        rounded: 'xl',
        contentClass: 'elevation-0',
      }"
    >
      <template #no-data>
        <v-list-item>
          <v-list-item-title>
            Search Users
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </FeathersVuexFind>
</template>

<script>
export default {
  props: {
    value: Array,
    menuClasses: String
  },
  data: () => ({
    search: ''
  }),
  computed: {
    user: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    searchParams() {
      return  {
        query: { }
      } 
    },
    dark(){
      return this.$vuetify.theme.dark
    }
  },
  methods: {
    searchFilter (item, queryText) {
      const text = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return text.indexOf(searchText) > -1
    },
  }
}
</script>

<style>

</style>