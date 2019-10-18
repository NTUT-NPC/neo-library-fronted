<template>
  <v-img v-if="showCharacter" height="100%" :src="characterImg" @click="showConfirmDialog = true">
    <div class="fill-parent d-flex justify-center align-end">
      <div
        class="font-size-3 pa-5 mb-1 white--text flash font-weight-black text-center"
      >{{ text.pressAnywhere[language] }}</div>
    </div>
    <v-dialog v-model="showConfirmDialog" max-width="80%">
      <v-card>
        <v-card-text class="pa-2 text-center font-size-3">{{ text.confirmChecked[language] }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="showConfirmDialog = false">No</v-btn>
          <v-btn text color="success" @click="finish">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-img>
  <v-img v-else height="100%" :src="loadedData['common/others/backgroundA'].base64Src">
    <div class="fill-parent d-flex justify-center align-center">
      <div class="fit-background text-center white--text font-size-2">
        <div style="margin-bottom: 20%;" class="font-size-4">{{ text.paragraph1[language] }}</div>
        <div>{{ text.paragraph2[language] }}</div>
        <div class="font-size-3 my-5">{{ text.paragraph3[language] }}</div>
        <div>{{ text.paragraph4[language] }}</div>
        <div style="margin-top: 20%; margin-bottom: 10%;">{{ text.paragraph5[language] }}</div>
        <v-btn
          class="font-size-3"
          style="color: #35286c;"
          color="primary"
          large
          rounded
          width="150"
          @click="showCharacter = true"
        >{{ text.button[language] }}</v-btn>
      </div>
    </div>
  </v-img>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Character',
  computed: {
    ...mapState([
      'loadedData',
      'language',
      'characterIndex'
    ]),
    characterImg () {
      const characters = ['wukong', 'wuneng', 'wujing']
      const character = characters[this.characterIndex]
      return this.loadedData[`common/characterCards/${character}`].base64Src
    }
  },
  data () {
    return {
      showCharacter: false,
      text: {
        paragraph1: { en: 'Dear Reader', zh: '親愛的讀者您好' },
        paragraph2: { en: 'We\'re glad to see you attending our activity', zh: '歡迎參加圖書館' },
        paragraph3: { en: '《Journey To The Library》', zh: '《尋師旅圖》' },
        paragraph4: { en: '', zh: '實境解謎活動' },
        paragraph5: { en: 'Let us reveal your character together...', zh: '現在一起來看看您的角色是...' },
        button: { en: 'Check', zh: '看角色' },
        pressAnywhere: { en: 'Press Anywhere On Screen', zh: '點擊螢幕任意處' },
        confirmChecked: { en: 'Are you sure that you have checked your character？', zh: '確定已經看完角色了嗎？' }
      },
      showConfirmDialog: false
    }
  },
  methods: {
    finish () {
      this.showConfirmDialog = false
      this.$emit('change-subview', 'Wait')
    }
  }
}
</script>
