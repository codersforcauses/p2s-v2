<template>
  <v-card flat tile height="100%" class="py-sm-12 px-2">
    <v-btn icon class="float-right ma-0 ma-sm-2" @click="$emit('close')"
      ><v-icon>mdi-close</v-icon></v-btn
    >
    <FeathersVuexGet
      v-slot="{ item: student }"
      service="students"
      :id="report.student"
      :watch="report.student"
    >
      <v-card-title class="text-h5">{{ student.name }}'s Report</v-card-title>
    </FeathersVuexGet>

    <pre>{{ JSON.stringify(report, null, 2) }}</pre>
    <v-card-text :style="$vuetify.breakpoint.xs ? 'height: 75vh;' : ''">
      <v-card flat>
        <v-card-title class="text-h6">Attendence</v-card-title>
        <v-card-actions>
          <FeathersVuexInputWrapper :item="report" prop="attended">
            <template #default="{ current, prop, createClone, handler }">
              <v-radio-group
                v-model="current[prop]"
                @click="createClone"
                @change="(e) => handler(e, saveReport)"
              >
                <v-radio label="Present" value="Present"></v-radio>
                <v-radio label="Absent from school" value="SchoolAbsent"></v-radio>
                <v-radio label="Absent but at school" value="SchoolAttended"></v-radio>
              </v-radio-group>
            </template>
          </FeathersVuexInputWrapper>
        </v-card-actions>
      </v-card>
      <div v-if="report.attended === 'Present'" class="d-flex flex-column justify-start">
        <v-card-title class="text-h6">Score</v-card-title>
        <div v-for="category in Object.keys(matrix)" :key="category" class="d-flex flex-column">
          <v-card-title>{{ category | capitalise }}</v-card-title>
          <div v-for="entry in Object.keys(matrix[category])" :key="entry">
            <v-card-subtitle class="text-body-1">{{
              matrix[category][entry].title
            }}</v-card-subtitle>
            <FeathersVuexInputWrapper :item="report" prop="value">
              <template #default="{ current, prop, createClone, handler }">
                <div class="d-flex justify-space-between align-start" style="width: 90%">
                  <v-card-title class="text-h5 py-0" color="primary">{{
                    current['matrixResults'][category][entry][prop] >= 0 ? current['matrixResults'][category][entry][prop] : '-' 
                  }}</v-card-title>
                  <v-slider
                    v-model="current['matrixResults'][category][entry][prop]"
                    ticks="always"
                    :max="maxScore"
                    :min="-1"
                    color="primary"
                    @click="createClone"
                    @change="(e) => handler(e, saveReport)"
                  ></v-slider>
                </div>
              </template>
            </FeathersVuexInputWrapper>
          </div>
        </div>
      </div>
      <div>
        <v-card-title class="text-h6">Comments</v-card-title>
        <FeathersVuexInputWrapper :item="report" prop="notes">
          <template #default="{ current, prop, createClone, handler }">
            <v-textarea v-model="current[prop]" @focus="createClone" @blur="e => handler(e, saveReport)" filled rounded></v-textarea>
          </template>   
        </FeathersVuexInputWrapper>
      </div>

      <v-card-actions class="pb-14">
        <v-btn color="primary" @click="$emit('close')">Done</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // if(Object.keys(this.report.matrix).length === 0)
  },
  data: () => ({
    attendence: 0,
    maxScore: 7,
    matrix: {
      autonomy: {
        coping: {
          title: 'Able to cope with change',
        },
        confidence: {
          title: 'Confidence in participation',
        },
      },
      attitude: {
        responsible: {
          title: 'Demonstrates responsible behaviour',
        },
        tolerannce: {
          title: 'Peer tolerance',
        },
        enthusiasm: {
          title: 'Enthusiasm',
        },
        learning: {
          title: 'Demonstrates willingness to learn',
        },
      },
      communication: {
        verbal: {
          title: 'Appropriate verbal communication',
        },
        listening: {
          title: 'Active listening',
        },
        responsivness: {
          title: 'Positive response to communication',
        },
      },
      thinking: {
        solving: {
          title: 'Able to solve problems',
        },
      },
    },
  }),
  filters: {
    capitalise: (value) => {
      if (!value) return '';
      const newVal = value.toString();
      return newVal.charAt(0).toUpperCase() + newVal.slice(1);
    },
  },
  methods: {
    async saveReport({ event, clone, prop, data }) {
      console.log(data)
      const report = clone.commit();
      return report.patch({ data });
    },
    handleSaveReponse(savedItem) {
      console.log(savedItem);
    },
  },
};
</script>
