<template>
  <v-img
    height="100%"
    :src="loadedData['common/others/backgroundA'].base64Src"
    @click="checkCanEnter"
  >
    <v-snackbar v-model="showSnackbar" color="error" bottom :timeout="3000">
      <div class="fill-parent text-center font-size-1">{{ text.notOpen[language] }}</div>
    </v-snackbar>
    <div v-show="!isLoading" class="fill-parent d-flex justify-center align-center">
      <div
        class="fit-background white--text text-center font-size-3 flash"
      >{{ text.wait[language] }}</div>
    </div>
  </v-img>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import createPublicAPI from '@/api/public'

const api = createPublicAPI()

export default {
  name: 'Wait',
  computed: {
    ...mapState([
      'language',
      'loadedData',
      'characterIndex',
      'showProgressDialog'
    ])
  },
  data () {
    return {
      text: {
        wait: { en: 'Please wait for game open', zh: '請等待遊戲開放進入' },
        notOpen: { en: 'The game is not open', zh: '遊戲尚未開放進入！' }
      },
      isLoading: false,
      canEnter: false,
      showSnackbar: false
    }
  },
  methods: {
    ...mapActions([
      'setShowProgressDialog',
      'setProgressDialogText'
    ]),
    async checkCanEnter () {
      this.setShowProgressDialog(true)
      this.setProgressDialogText('Checking Game Status...')
      this.canEnter = await api.getCurrentGameStatus(this.characterIndex)
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.setShowProgressDialog(false)
      this.setProgressDialogText('')

      if (!this.canEnter) {
        this.showSnackbar = true
        return
      }
      this.$emit('change-view', 'GameMain')
    }
  },
  created () {
    this.checkCanEnter()
  }
}
</script>
