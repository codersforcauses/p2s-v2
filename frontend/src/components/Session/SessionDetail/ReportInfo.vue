<template>
  <v-card v-if="report" flat tile height="100%" class="py-sm-12 pa-2">
    <v-btn icon class="float-right ma-0 ma-sm-2" @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn>
    <pre>{{JSON.stringify(report, null, 2)}}</pre>
  </v-card>
</template>

<script>
export default {
  props: {
    report: Object,
  },
};
</script>
