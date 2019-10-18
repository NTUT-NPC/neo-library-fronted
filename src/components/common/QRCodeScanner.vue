<template>
  <qrcode-stream @decode="$emit('decode', $event)" @init="onInit">
    <!-- <p class="error--text">{{ error }}</p> -->
    <label v-if="error">
      <v-icon size="144">mdi-camera</v-icon>
      <qrcode-capture
        v-show="false"
        :multiple="false"
        @decode="$emit('decode', $event)"
        @detect="$emit('detect', $event)"
      ></qrcode-capture>
    </label>
  </qrcode-stream>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'

export default {

  components: { QrcodeStream, QrcodeCapture },

  data () {
    return {
      error: ''
    }
  },

  methods: {
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
