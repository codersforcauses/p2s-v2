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
        <v-toolbar-title class="text-h6">Matrix</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form v-model="valid" @keyup.native.enter="createSession($event)">
        <v-container class="pa-4">
          <h2 class="text-h6">AUTONOMY</h2>
          <p class="mb-1 mt-2">How did they cope with change?</p>
          <v-radio-group
            v-model="matrix.autonomy.cope"
            row
            mandatory
            persistent-hint
            :hint="autonomyHints.cope[matrix.autonomy.cope - 1]"
            class="mt-0"
          >
            <v-radio
              v-for="n in 7"
              :key="n"
              :label="`${n}`"
              :value="n"
            />
          </v-radio-group>
          <p class="mb-1 mt-2">How engaged was the student in school/session?</p>
          <v-radio-group
            v-model="matrix.autonomy.engaged"
            row
            mandatory
            persistent-hint
            :hint="autonomyHints.engaged[matrix.autonomy.engaged - 1]"
            class="mt-0"
          >
            <v-radio
              v-for="n in 7"
              :key="n"
              :label="`${n}`"
              :value="n"
            />
          </v-radio-group>
          <p class="mb-1 mt-2">How confident was the student?</p>
          <v-radio-group
            v-model="matrix.autonomy.confident"
            row
            mandatory
            persistent-hint
            :hint="autonomyHints.confident[matrix.autonomy.confident - 1]"
            class="mt-0"
          >
            <v-radio
              v-for="n in 7"
              :key="n"
              :label="`${n}`"
              :value="n"
            />
          </v-radio-group>
          <h2 class="text-h6 mt-6">ATTITUDE</h2>
          <p class="mb-1 mt-2">How did they approach tasks and activities?</p>
          <v-radio-group
            v-model="matrix.attitude.approach"
            row
            mandatory
            persistent-hint
            :hint="attitudeHints.approach[matrix.attitude.approach - 1]"
            class="mt-0"
          >
            <v-radio
              v-for="n in 7"
              :key="n"
              :label="`${n}`"
              :value="n"
            />
          </v-radio-group>
          <h2 class="text-h6">COMMUNICATION</h2>
          <h2 class="text-h6">CORE THINKING SKILLS</h2>
          <h2 class="text-h6">RELIABILITY</h2>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ['value'],
  data() {
    return {
      matrix: {
        autonomy: {
          cope: 1,
          engaged: 1,
          confident: 1,
        },
        attitude: {
          approach: 1,
          consequence: 1,
          respect: 1,
        },
      },
      autonomyHints: {
        cope: [
          'Got angry or withdrawn',
          'Coped only because they were in a positive mood',
          'Struggled but coped when they felt supported',
          'With time adapted to change',
          'Embraced change with support',
          'Embraced change',
          'Initiated positive change'
        ],
        engaged: [
          'Not at all',
          'Had to be coerced',
          'Engaged with constant encouragement',
          'Occasionally engaged',
          'Engaged most of the time',
          'Showed willingness to engage',
          'Fully engaged'
        ],
        confident: [
          'Unable to identify positive qualities even when pushed',
          'Identified positive qualities but did not see any in themselves',
          'Acknowledged some positive qualities when encouraged',
          'Visibly grew in confidence but still did not push themselves outside their comfort zone',
          'Visibly confident and with encouragement pushed themselves outside their comfort zone',
          'Displayed increased confidence as a result of new endeavours',
          'Confident without arrogance, stepped up when faced with a new challenge'
        ]
      },
      attitudeHints: {
        approach: [
          'Approached all tasks and activities negatively',
          'Approached tasks and activities negatively unless it was of a particular interest',
          'Had an indifferent approach to most tasks',
          'Capable of a positive approach to tasks and activities but let themselves down in their application',
          'Approached tasks and activities positively but struggled with failure',
          'Approached tasks and activities with enthusiasm and tried things out of their comfort zone when they felt supported, even with the knowledge they may fail',
          'Approached tasks and activities positively and enthusiastically. Willingly tried things out of their comfort zone and were able to cope with failure'
        ],
        consequence: 1,
        respect: 1,
      }
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
