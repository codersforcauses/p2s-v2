<template>
  <v-card v-if="report" flat tile height="100%" class="py-sm-12">
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
