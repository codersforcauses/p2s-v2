<template>
  <v-card v-if="report" flat tile height="100%" class="py-sm-12 px-2">
    <v-btn v-if="!$vuetify.breakpoint.xs" icon class="float-right ma-0 ma-sm-2" @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn>
    <v-card-title class="text-h5">Report</v-card-title>
    <v-card-text :style="$vuetify.breakpoint.xs ? 'height: 75vh;' : ''">

    <!-- <pre>{{JSON.stringify(report, null, 2)}}</pre> -->
    <v-card flat>
      <v-card-title class="text-h6">Attendence</v-card-title>
      <v-card-actions>
        <v-radio-group v-model="attendence">
          <v-radio
            label="Present"
            :value="0"
          ></v-radio>
          <v-radio
            label="Absent from school"
            :value="1"
          ></v-radio>
          <v-radio
            label="Absent but at school"
            :value="2"
          ></v-radio>
        </v-radio-group>
      </v-card-actions>
    </v-card>
    <div class="d-flex flex-column justify-start">
      <v-card-title class="text-h6">Score</v-card-title>
      <div v-for="category in Object.keys(matrix)" :key="category" class="d-flex flex-column">
        <v-card-title>{{category | capitalise }}</v-card-title>
        <div v-for="entry in Object.keys(matrix[category])" :key="entry">
          <v-card-subtitle class="text-body-1">{{matrix[category][entry].title}}</v-card-subtitle>
          <div class="d-flex justify-space-between align-start" style="width: 90%;">
            <v-card-title class="text-h5 py-0" color="primary">{{matrix[category][entry].value}}</v-card-title>
            <v-slider v-model="matrix[category][entry].value" ticks="always" :max="maxScore" color="primary"></v-slider>
          </div>
        </div>
      </div>
    </div>
    <div>
      <v-card-title class="text-h6">Comments</v-card-title>
      <v-textarea filled rounded></v-textarea>
    </div>
    </v-card-text>

    <v-card-actions class="pb-14">
      <v-btn color="primary" @click="$emit('close')">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    report: Object,
  },
  data: () => ({
    attendence: 0,
    maxScore: 7,
    matrix: {
      autonomy: {
        coping: {
          title: 'Able to cope with change',
          value: 0,
        },
        confidence: {
          title: 'Confidence in participation',
          value: 0,
        },
      },
      attitude: {
        responsible: {
          title: 'Demonstrates responsible behaviour',
          value: 0,
        },
        tolerannce: {
          title: 'Peer tolerance',
          value: 0,
        },
        enthusiasm: {
          title: 'Enthusiasm',
          value: 0,
        },
        learning: {
          title: 'Demonstrates willingness to learn',
          value: 0,
        },
      },
      communication: {
        verbal: {
          title: 'Appropriate verbal communication',
          value: 0,
        },
        listening: {
          title: 'Active listening',
          value: 0,
        },
        responsivness: {
          title: 'Positive response to communication',
          value: 0,
        }
      },
      thinking: {
        solving: {
          title: 'Able to solve problems',
          value: 0,
        }
      }
    },
    reliability: {
      onTime: false,
      late: false
    }
  }),
  filters: {
    capitalise: (value) => {
      if (!value) return ''
      const newVal = value.toString()
      return newVal.charAt(0).toUpperCase() + newVal.slice(1)
    }
  }
};
</script>
