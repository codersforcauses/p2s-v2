<template>
  <v-img
    position="bottom"
    :aspect-ratio="3/1"
    :src="require(`@/assets/wa-${dark}.svg`)"
  >
    <spinner slot="placeholder"/>
  </v-img>
</template>

<script>
import spinner from '../../other/Spinner.vue';

export default {
  components: {
    spinner
  },
  computed: {
    dark() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
}
</script>

<style>

</style>