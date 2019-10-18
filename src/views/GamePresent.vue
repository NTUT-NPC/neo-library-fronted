<template>
  <v-img height="100%" :src="loadedData['common/others/backgroundA'].base64Src">
    <div class="d-flex justify-center align-center fill-parent">
      <div class="d-flex justify-center align-center flex-column fit-background">
        <p class="font-size-5 mb-5 white--text">{{ text.title[language] }}</p>
        <v-btn :width="size" :height="size" text @click="getPresent">
          <v-img :width="size" :height="size" :src="loadedData['common/others/giftbox'].base64Src"></v-img>
        </v-btn>

        <div class="mt-10" :style="`width: ${size}px;`">
          <v-dialog v-model="showConfirmDialog" max-width="80%">
            <template v-slot:activator="{ on }">
              <v-btn
                class="font-size-2"
                rounded
                block
                color="primary"
                :disabled="presentType === null"
                v-on="on"
              >{{ text.exchanged[language] }}</v-btn>
            </template>

            <v-card>
              <v-card-text
                class="pa-2 text-center font-size-3"
              >{{ text.confirmExchanged[language] }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="showConfirmDialog = false">No</v-btn>
                <v-btn text color="success" @click="finish">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <ProgressDialog :value="isLoading" message="Loading..."></ProgressDialog>
    <v-dialog v-model="showPresentDialog" max-width="80%">
      <v-img :src="prizeImage" @click="showPresentDialog = false"></v-img>
    </v-dialog>
  </v-img>
</template>

<script>
import { mapState } from 'vuex'
import createPrivateAPI from '@/api/private'
import ProgressDialog from '@/components/common/ProgressDialog'

export default {
  name: 'GamePresent',
  components: {
    ProgressDialog
  },
  computed: {
    ...mapState([
      'loadedData',
      'language',
      'token'
    ]),
    prizeImage () {
      return this.loadedData[`common/others/${this.presentType ? 'specialReward' : 'normalReward'}`].base64Src
    }
  },
  data () {
    return {
      api: null,
      size: 180,
      text: {
        title: { en: 'Prize Drawing', zh: '抽禮物' },
        congratulation: { en: 'You get the prize', zh: '恭喜你獲得' },
        prizeNormalTitle: { en: 'Normal Prize', zh: '普通獎' },
        prizeSpecialTitle: { en: 'Special Prize', zh: '特別獎' },
        prizeNormal: { en: 'Sticker + Folder', zh: '貼紙 + 文件夾' },
        prizeSpecial: { en: 'Power Bank', zh: '行動電源' },
        exchanged: { en: 'Exchanged', zh: '兌換完畢' },
        confirmExchanged: { en: 'Are you sure that you have exchanged the gift？', zh: '確定已經兌換完畢了嗎？' }
      },
      presentType: null,
      isLoading: false,
      showPresentDialog: false,
      showConfirmDialog: false
    }
  },
  methods: {
    async getPresent () {
      if (!this.presentType) {
        this.isLoading = true
        this.presentType = await this.api.getPresentType()
        this.isLoading = false
      }
      this.showPresentDialog = true
    },
    finish () {
      this.showConfirmDialog = false
      window.open('https://page.line.me/jux9049u', '_blank')
    }
  },
  created () {
    this.api = createPrivateAPI(this.token)
  }
}
</script>
