<template>
   <v-text-field
    label="Search"
    v-model.trim="search"
    solo-inverted
    flat
    hide-details
    validate-on-blur
    rounded
    class="rounded-xl"
    color="primary"
  />
</template>

<script>
export default {
  props: {
    text: String,
  },
  computed: {
    search: {
      get() {
        return this.text
      },
      set(val) {
        this.$emit('setSearch', val)
      }
    },
  }
}
</script>