<template>
  <FeathersVuexFind v-slot="{ items: coaches, isFindPending: isPending }" service="users" :params="{ query }" watch="params">
    <v-autocomplete
      v-model.trim="coach"
      :loading="isPending"
      :items="coaches"
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
      label="Search for a coach"
      solo-inverted
      :menu-props="{
        offsetY: true,
        light: dark,
        dark: !dark,
        transition: 'slide-y-transition',
        rounded: 'xl',
        contentClass: 'elevation-0',
      }"
      :rules="[v => !!v || 'This field is required']"
    >
      <template #no-data>
        <v-list-item>
          <v-list-item-title>
            Search Coaches
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
    coach: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    query() {
      return  {
        name: {
          $regex: `.*${this.search}.*`,
          $options: 'i'
        },
        "coach.is": true
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