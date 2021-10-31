<template>
  <v-list two-line subheader>
    <v-list-item @click="openCreateDialog">
      <v-icon color="primary">mdi-plus</v-icon>
      <v-list-item-subtitle class="ml-3" style="color: #f87f79">Add Session</v-list-item-subtitle>
      <v-slot />
    </v-list-item>
    <v-list-item-group v-model="selected" @change="selectSession" mandatory color="primary">
      <template v-for="item in items">
        <v-list-item :key="item._id" @click="$emit('open')">
          <v-list-item-content>
            <v-slot />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>

export default {
  props: {
    items: Array
  }
}
</script>