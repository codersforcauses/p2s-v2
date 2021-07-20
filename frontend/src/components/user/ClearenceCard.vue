<template>
  <v-col class="text-caption text--secondary">
    <span class="ml-6">{{ title }}</span>
    <v-card height="128" class="rounded-lg" flat>
      <v-skeleton-loader height="100%" type="image" :loading="false">
        <img v-if="clearence.image" :src="clearence.image" :alt="title" class="rounded-lg" />
        <v-card
          v-else
          height="128"
          class="rounded-lg d-flex justify-center align-center"
          flat
          color="#585858"
        >
          <v-btn v-if="editing" height="100%" width="100%" class="rounded-lg" text :loading="isSelecting" @click="onButtonClick">
            <v-icon color="primary">mdi-plus</v-icon>
          </v-btn>
          <v-btn v-else height="100%" width="100%" class="rounded-lg" text disabled>
            <v-icon color="grey">mdi-image-remove</v-icon>
          </v-btn>
        </v-card>
      </v-skeleton-loader>
      <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        >
      </v-card>
    <v-text-field
      v-if="clearence.image"
      solo-inverted
      flat
      prefix="Expires: "
      :disabled="!editing || !clearence.image"
      class="mt-2 rounded-lg"
      type="text"
      placeholder="dd/mm/yy"
      :rules="[validation.required, validation.expiry]"
      v-model="clearence.expiry"
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    clearence: {
      type: Object,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    editing: {
      type: Boolean,
      require: true,
    },
  },
  watch: {

  },
  methods: {
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        console.log("hello")
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      [ this.selectedFile ] = e.target.files
      this.isSelecting = false
      this.$emit('fileUploaded', this.selectedFile)
      // do something
      
    }
  },
  data: () => ({
    selectedFile: null,
    isSelecting: false,
    expiresDate: '',
    validation: {
      required: value => !!value || 'This field is required',
      expiry: value => {
        const pattern = /^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/i;
        return pattern.test(value) || 'Invalid Date';
      },
    },
  }),
};
</script>
