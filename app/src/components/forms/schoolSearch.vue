<template>
  <v-autocomplete
    v-model.trim="school"
    :loading="isPending"
    :items="schools"
    :search-input.sync="search"
    color="primary"
    rounded
    flat
    clearable
    hide-selected
    style="padding-right: 1px;"
    :class="menuClasses"
    :filter="searchFilter"
    item-text="name"
    item-value="_id"
    label="Search for a school"
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
          Search Schools
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    value: String,
    schools: Array,
    menuClasses: String
  },
  data: () => ({
    search: ''
  }),
  computed: {
    school: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
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
