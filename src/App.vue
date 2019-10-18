<template>
  <v-app style="background-color: black;">
    <v-content class="align-center">
      <div id="fixed-ratio-container">
        <div id="view-container" class="fill-parent">
          <component v-show="isReady" :is="view" @change-view="onChangeView"></component>
          <v-dialog :value="isLadderCorrect === false" persistent max-width="300px">
            <v-card>
              <v-card-text class="pa-5 text-center font-size-3">Wrong Ladder！</v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog :value="canConnectToServer === false" persistent max-width="300px">
            <v-card>
              <v-card-text class="pa-5 text-center font-size-3">Cannot connect to server！</v-card-text>
            </v-card>
          </v-dialog>
          <ProgressDialog :value="showProgressDialog" :message="progressDialogText"></ProgressDialog>
        </div>
        <v-btn
          v-show="isReady && canFullscreen"
          id="btn-fullscreen"
          fixed
          top
          right
          fab
          x-small
          @click="toggleFullscreen"
        >
          <v-icon>{{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
        </v-btn>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import screenfull from 'screenfull'
import views from '@/views'
import ProgressDialog from '@/components/common/ProgressDialog'
import createPublicAPI from '@/api/public'

const api = createPublicAPI()

export default {
  name: 'App',
  components: {
    ...views,
    ProgressDialog
  },
  computed: {
    showProgressDialog: {
      get () { return this.$store.state.showProgressDialog },
      set (value) { this.$store.dispatch('setShowProgressDialog', value) }
    },
    progressDialogText: {
      get () { return this.$store.state.progressDialogText },
      set (value) { this.$store.dispatch('setProgressDialogText', value) }
    }
  },
  data () {
    return {
      view: 'GameStart',
      ladder: this.$route.query.ladder,
      canConnectToServer: null,
      isLadderCorrect: null,
      showFullScreenDialog: true,
      screenfull,
      isFullscreen: false,
      canFullscreen: screenfull.isEnabled,
      isReady: false
    }
  },
  methods: {
    onChangeView (newView) {
      this.view = newView
    },
    async init () {
      await this.sayHelloToServer()
      if (!this.canConnectToServer) return
      await this.verifyLadder()
      this.isReady = true
    },
    async sayHelloToServer () {
      this.showProgressDialog = true
      this.progressDialogText = 'Say hello to server...'
      this.canConnectToServer = await api.hello()
      this.showProgressDialog = false
      this.progressDialogText = ''
    },
    async verifyLadder () {
      this.showProgressDialog = true
      this.progressDialogText = 'Verifying...'
      const ladder = await api.getCurrentLadder()
      this.isLadderCorrect = this.ladder === ladder
      this.showProgressDialog = false
      this.progressDialogText = ''
    },
    async toggleFullscreen () {
      this.screenfull.toggle(document.getElementById('app'))
      this.isFullscreen = !this.screenfull.isFullscreen
    },
    onFullscreen () {
      this.screenfull.request()
      this.isFullscreen = true
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
#fixed-ratio-container {
  position: relative;
  padding-bottom: 177.778%;

  #view-container {
    position: absolute;
    top: 0;
    left: 0;
  }

  #btn-fullscreen {
    opacity: 0.5;
  }
}
</style>
