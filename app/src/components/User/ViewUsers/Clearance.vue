<template>
  <v-container>
    <v-row>
      <v-card-title class="subtitle-1 py-0">{{ title }}</v-card-title>
    </v-row>
    <v-row v-if="expiry !== undefined || verified !== undefined">
      <v-col sm="6" cols="12">
        <v-card-text v-if="verified">
          <v-icon color="primary">mdi-eye-check</v-icon>Verified
        </v-card-text>
        <v-card-text v-else>
          <v-icon color="primary">mdi-eye-remove</v-icon>Not Verified
        </v-card-text>
      </v-col>
      <v-col sm="6" cols="12">
        <v-card-text v-if="expiry">
          <v-icon color="primary">mdi-calendar-refresh</v-icon>
          {{ expiry | formatExpiry }}
        </v-card-text>
        <v-card-text v-else>
          <v-icon color="primary">mdi-calendar-question</v-icon>
          Expiry Unknown
        </v-card-text>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col sm="6" cols="12">
        <v-card-text>
          <v-icon color="primary">mdi-close</v-icon>
          Not Qualified
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    title: String,
    expiry: String,
    verified: Boolean
  },
  filters: {
    formatExpiry: (value) => {
      if (!value) return ''
      return dayjs(value).format('DD/MM/YY');
    }
  }
}
</script>

<style scoped>
.v-card__text,
.v-card__title,
.v-card__subtitle {
  padding: 0;
}

.v-icon {
  margin-right: 5px;
}

.col-12 {
  padding: 5px 0;
}

.row {
  padding: 4px;
}

.container {
  padding: 20px 40px;
}
</style>