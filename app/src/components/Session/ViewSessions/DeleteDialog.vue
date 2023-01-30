<template>
  <v-dialog
    v-model="showDialog"
    max-width="320"
    content-class="rounded-xl"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>Delete Session - {{ session.location }}</v-card-title>
      <v-card-subtitle>{{ dayNum }}{{ dayOrdinal }} {{ monthName }}, {{ dateYear !== currentYear ? dateYear : ''}}</v-card-subtitle>
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
          @click="deleteSession"
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
    session: Object
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
      return this.session.date
    }
  },
  methods: {
    ...mapActions('sessions', { delete: 'remove'}),
    async deleteSession() {
      try {
        await this.delete(this.session._id)
        this.showDialog = false;
        this.$router.push({ path: `/sessions` })
      } catch(err) {
        this.error = 'Failed to delete session'
        console.error(err.message)
      }
    }
  }
}
</script>

<style>

</style>