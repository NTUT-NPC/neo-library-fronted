<template>
  <v-img :src="sessionImage" height="100%" @click="onImageClick"></v-img>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'language'
    ]),
    ...mapGetters([
      'currentStage'
    ]),
    sessionImage () {
      return this.currentStage.base64Src
    }
  },
  methods: {
    onImageClick () {
      this.$emit('stage-clear')
    }
  }
}
</script>

<style lang="scss" scoped>
.touch-area {
  height: 100%;
}
</style>
