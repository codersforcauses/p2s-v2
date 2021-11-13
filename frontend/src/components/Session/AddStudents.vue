<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    content-class="rounded-xl"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
  <v-card flat rounded="xl">
      <v-toolbar flat>
        <v-toolbar-title class="text-h6">Add Students</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <FeathersVuexFind
            v-slot="{ items: students }"
            service="students"
            :params="{ query: { $limit: 200 } }"
            watch="params"
          >
      <v-skeleton-loader type="list-item-two-line@10" :loading="!students">
        <v-list two-line subheader flat>
          <v-list-item-group multiple v-model="selected" color="primary">
            <template v-for="student in students">
              <v-list-item :key="student._id" class="px-0 px-sm-3">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" color="primary"></v-checkbox
                  ></v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text--primary">{{ student.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text--secondary">
                      Year {{ student.schoolYear }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>{{ student.school }}</v-list-item-content>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-skeleton-loader> 
      </FeathersVuexFind>
      <v-card style="position: absolute; bottom: 0;" class="rounded-b-xl" width="100%" height="20px">Add</v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    selected: []
  }),
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  }
};
</script>
