<template>
  <v-dialog
    v-model="showDialog"
    max-width="320"
    content-class="rounded-xl"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>Delete School - {{ school.name }}</v-card-title>
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
          @click="deleteSchool"
        >
          Delete
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import dateUtils from '../../../utils/date'


export default {
  mixins: [dateUtils],
  props: {
    value: Boolean,
    school: Object
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
    },
    date() {
      return this.school.date
    }
  },
  methods: {
    ...mapActions('schools', { delete: 'remove'}),
    async deleteSchool() {
      try {
        await this.delete(this.school._id)
        this.showDialog = false;
      } catch(err) {
        this.error = 'Failed to delete school'
        console.error(err.message)
      }
    }
  }
}
</script>

<style>

</style>