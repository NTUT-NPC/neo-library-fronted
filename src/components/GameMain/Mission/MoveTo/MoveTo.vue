<template>
  <div class="text-center fill">
    <QRCodeScanner style="display: inline-block;" @decode="onDecode"></QRCodeScanner>
    <p class="font-size-3 mt-3">{{ resultText }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QRCodeScanner from '@/components/common/QRCodeScanner'

export default {
  props: [
    'place-text',
    'answer'
  ],
  data () {
    return {
      text: {
        instruction: { en: `Please move to the ${this.placeText} and scan the QR Code there`, zh: `請移動至 ${this.placeText} 並掃描 QR Code` },
        wrongPlace: { en: `It looks like you are in the wrong place！Please move to ${this.placeText} and scan the QR Code`, zh: `好像不是這裡喔！請移動至 ${this.placeText} 並掃描 QR Code` }
      },
      resultText: ''
    }
  },
  computed: {
    ...mapState([
      'language'
    ])
  },
  components: {
    QRCodeScanner
  },
  methods: {
    onDecode (code) {
      if (code.trim() === this.answer.trim()) {
        this.resultText = ''
        this.$emit('mission-complete')
        return
      }

      this.resultText = this.text.wrongPlace[this.language]
    }
  },
  created () {
    this.resultText = this.text.instruction[this.language]
  }
}
</script>
