<template>
  <v-dialog
    v-model="showDialog"
    max-width="320"
    content-class="rounded-xl"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>Delete User - {{ user.name }}</v-card-title>
      <v-alert
        v-if="error"
        type="error"
      >{{ error }}</v-alert>
      <v-card-actions>
        <v-btn
          rounded
          elevation="0"
          @click="showDialog = false"
        >
          Cancel
        </v-btn>
        
        <v-spacer></v-spacer>

        <v-btn
          color="error"
          rounded
          elevation="0"
          @click="deleteUser"
        >
          Delete
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: Boolean,
    user: Object
  },
  data: () => ({
    error: ''
  }),
  computed: {
    showDialog: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    ...mapActions('users', { delete: 'remove'}),
    async deleteUser() {
      try {
        await this.delete(this.user._id)
        this.showDialog = false;
      } catch(err) {
        this.error = 'Failed to delete user'
        console.error(err.message)
      }
    }
  }
}
</script>

<style>

</style>