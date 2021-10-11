<template>
  <v-sheet rounded="xl" class="py-3">
    <FeathersVuexFind
      v-slot="{ items: schools, isFindPending: isPending, queryInfo: info }"
      service="schools"
      :params="{ query }"
      watch="params"
    >
      <div>
        <div :style="{ width: $vuetify.breakpoint.smAndUp ? '50vw' : '100vw'}">
          <div class="mb-2 mr-1 ml-auto d-flex align-center justify-space-between" style="width: 10rem;">
            <v-btn icon color="primary" :disabled="skip === 0" @click="skip -= limit">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <span>Page {{skip/limit+1}}</span>
            <v-btn icon color="primary" :disabled="skip + limit >= info.total" @click="skip += limit">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
        <v-skeleton-loader type="list-item-two-line@10" :loading="isPending">
          <v-list two-line subheader>
            <v-list-item-group v-model="selected" mandatory color="primary">
              <template v-for="school in schools">
                <v-list-item :key="school._id" @click="drawer = true">
                  <v-list-item-content>
                    <v-list-item-title class="text--primary">{{school.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{`${school.address.suburb}, ${school.address.state}`}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-skeleton-loader>
        <v-navigation-drawer
          v-if="$vuetify.breakpoint.smAndUp"
          width="50%"
          mobile-breakpoint="xs"
          fixed
          clipped
          right
          disable-resize-watcher
          disable-route-watcher
          class="py-3 px-0"
        >
          <template #default>
            <school-info :school="schools[selected]" />
          </template>
        </v-navigation-drawer>
        <v-bottom-sheet v-else v-model="drawer" scrollable>
          <v-sheet class="rounded-t-xl pt-6">
            <template #default>
              <school-info :school="schools[selected]" />
            </template>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </FeathersVuexFind>
  </v-sheet>
</template>

<script>
import SchoolInfo from './SchoolInfo';

export default {
  name: 'view staff',
  title: 'View Staff',
  components: {
    SchoolInfo,
  },
  data() {
    return {
      selected: 0,
      drawer: true,
      limit: 10,
      skip: 0
    };
  },
  computed: {
    query() {
      return {
        $limit: this.limit,
        $skip: this.skip,
        $sort: {
          name: 1,
        }
      }
    }
  }
};
</script>
