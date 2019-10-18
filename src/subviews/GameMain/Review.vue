<template>
  <v-img
    height="100%"
    style="position: relative;"
    :src="loadedData['common/others/backgroundB'].base64Src"
  >
    <div class="review-container">
      <template v-if="review.length">
        <div
          v-for="reviewContent in reviewContents"
          :key="`review-${reviewContent.id}`"
          class="ma-3"
        >
          <div
            style="background-color: #C16D4A; border-radius: 25px; color: white;"
            class="font-size-2 pa-2 text-center"
            @click="openReview(reviewContent.dialogue)"
          >{{ reviewContent.title }}</div>
        </div>
      </template>
      <div
        v-else
        class="text-center font-size-4 fill-parent d-flex justify-center align-center grey--text"
      >{{ text.empty[language] }}</div>
    </div>
    <v-dialog v-if="dialogue" v-model="showReviewDialog" fullscreen>
      <v-img
        height="100%"
        style="position: relative;"
        :src="loadedData['common/others/backgroundB'].base64Src"
        @click="closeReviewDialog"
      >
        <div class="review-container pa-3">
          <div v-for="(line, index) in dialogue" :key="`dialogue-line-${index}`">
            <v-divider v-if="index !== 0" class="my-2"></v-divider>
            <div class="font-size-3">{{ `${line.name}：` }}</div>
            <div class="pl-5" style="line-height: 2rem;">{{ line.sentence }}</div>
          </div>
        </div>
      </v-img>
    </v-dialog>
  </v-img>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Review',
  computed: {
    ...mapState([
      'review',
      'loadedData',
      'language'
    ]),
    ...mapGetters([
      'character'
    ]),
    reviewContents () {
      return this.review.map(reviewId => this.loadedData[`${this.character}/review/${reviewId}`])
    }
  },
  data () {
    return {
      showReviewDialog: false,
      dialogue: null,
      text: {
        empty: { en: 'Empty', zh: '空空如也' }
      }
    }
  },
  methods: {
    openReview (dialogue) {
      this.dialogue = dialogue
      this.showReviewDialog = true
    },
    closeReviewDialog () {
      this.showReviewDialog = false
      this.dialogue = null
    }
  }
}
</script>

<style lang="scss" scoped>
.review-container {
  max-width: 767px;
  margin: auto;
  overflow-y: auto;
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 14%;
}
</style>
