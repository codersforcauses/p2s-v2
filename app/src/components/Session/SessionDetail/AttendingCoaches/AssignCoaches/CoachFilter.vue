<template>
  <v-toolbar flat>
    <v-row>
      <v-col cols="4" class="pa-0">
        <v-text-field
          v-model="search"
          :menu-props="{
            offsetY: true,
            light: dark,
            dark: !dark,
            transition: 'slide-y-transition',
            rounded: 'xl',
            contentClass: 'elevation-0',
          }"
          label="Name"
          solo-inverted
          clearable
          flat
          hide-details
          rounded
          filled
          dense
          class="rounded-l-0"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    filterName: String,
  },
  data: () => ({
    search: '',
  }),
  computed: {
    selectedSchool: {
      get() {
        return this.filterName
      },
      set(name) {
        this.$emit('updateName', name);
      },
    },
    dark() {
      return this.$vuetify.theme.dark;
    },
  }
}
</script>
