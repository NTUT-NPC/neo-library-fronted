<template>
  <div class="fill-parent">
    <v-dialog :value="true" persistent max-width="300px">
      <v-card class="pa-3">
        <div class="text-center">
          <p class="font-size-5">選擇語言</p>
          <p class="font-size-3">Select a language</p>
        </div>
        <v-divider class="my-3"></v-divider>
        <div>
          <v-btn color="primary" block @click="selectLanguage('zh')">中文</v-btn>
        </div>
        <div class="mt-3">
          <v-btn color="primary" block @click="selectLanguage('en')">English</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SelectLanguage',
  data () {
    return {
      showSelectLanguageDialog: true,
      isLoading: false
    }
  },
  computed: {
    ...mapState([
      'language',
      'showProgressDialog'
    ])
  },
  created () {
    if (this.language) {
      this.selectLanguage(this.language)
    }
  },
  methods: {
    ...mapActions([
      'setLanguage',
      'loadCommonData',
      'setShowProgressDialog',
      'setProgressDialogText'
    ]),
    async selectLanguage (language) {
      this.setShowProgressDialog(true)
      this.setProgressDialogText('Loading Common Data...')
      this.setLanguage(language)
      await this.loadCommonData()
      this.setShowProgressDialog(false)
      this.setProgressDialogText('')
      this.$emit('change-subview', 'Welcome')
    }
  }
}
</script>
