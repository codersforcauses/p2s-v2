<template>
  <v-btn fab small depressed class="ma-0 mt-16 mr-3 btn-ontop" @click="$emit('close')">
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .btn-ontop {
    z-index:10; position: absolute; right: 0;
  }
</style>