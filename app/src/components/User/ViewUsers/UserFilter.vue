<template>
   <v-text-field
    label="Search"
    v-model.trim="search"
    solo-inverted
    flat
    persistent-hint
    validate-on-blur
    rounded
    class="mb-2 mt-1 rounded-l-xl rounded-r-0"
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