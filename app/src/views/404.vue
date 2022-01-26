<template>
  <v-main>
    <v-app-bar flat app color="transparent">
      <v-btn text name="back" @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
        <span class="ml-1">Go Back</span>
      </v-btn>
    </v-app-bar>

    <v-container fluid fill-height>
      <v-row align="center" justify="center" class="text-center">
        <div>
          <v-col xs12 tag="h1" class="display-4">404</v-col>
          <v-col xs12 tag="h2" class="display-2">Page Not Found</v-col>
        </div>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'error',
  title: 'Error: 404',
};
</script>
