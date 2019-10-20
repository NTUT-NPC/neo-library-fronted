<template>
  <div class="d-flex justify-center align-center">
    <div class="text-center">
      <p class="font-size-3">{{ text.question[language] }}</p>
      <div class="text-center">
        <div
          v-for="(suspectCard, index) in suspectCards"
          :key="`suspect-${index}`"
          :class="{ 'd-inline-block': index !== 0, 'mx-2': index !== 0 }"
        >
          <v-avatar
            size="100"
            @click="$emit('stage-jump', getToJumpStageName(suspectCard.suspect))"
          >
            <img :src="suspectCard.base64Src" />
          </v-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      text: {
        question: { en: 'Who did not tell the truth？', zh: '誰說的不是實話？' }
      }
    }
  },
  computed: {
    ...mapState([
      'language',
      'loadedData'
    ]),
    suspectCards () {
      const suspects = ['bull', 'budha', 'spider']
      return suspects.map(suspect => this.loadedData[`common/suspectCards/${suspect}`])
    }
  },
  methods: {
    getToJumpStageName (suspectName) {
      return `Select${suspectName[0].toUpperCase() + suspectName.slice(1)}`
    }
  }
}
</script>
