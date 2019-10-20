<template>
  <v-img height="100%" :src="canSkip ? '' : loadedData['common/others/backgroundA'].base64Src">
    <div v-if="!canSkip" class="fill-parent d-flex flex-column justify-center align-center">
      <div class="font-size-4 white--text mb-5">{{ text.title[language] }}</div>
      <div class="fit-background">
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="inputs.id"
            color="primary"
            dark
            :disabled="isLoading"
            :label="text.inputId[language]"
            :rules="[() => validator.required(inputs.id) || text.required[language]]"
            :error-messages="errorMessage"
            @keypress.enter="onSubmit"
          ></v-text-field>
          <v-text-field
            v-model="inputs.password"
            color="primary"
            dark
            :disabled="isLoading"
            type="password"
            :label="text.inputPassword[language]"
            :hint="text.inputPasswordHint[language]"
            :rules="[() => validator.required(inputs.id) || text.required[language]]"
            :error-messages="errorMessage"
            @keypress.enter="onSubmit"
          ></v-text-field>
        </v-form>
      </div>
      <v-btn
        class="font-size-3 mt-2"
        :disabled="isLoading"
        style="color: #35286c;"
        color="primary"
        large
        rounded
        width="150"
        @click="onSubmit"
      >{{ text.submit[language] }}</v-btn>
    </div>
    <ProgressDialog :value="isLoading" message="Loading..."></ProgressDialog>
  </v-img>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProgressDialog from '@/components/common/ProgressDialog'
import createPublicAPI from '@/api/public'

const api = createPublicAPI()

export default {
  name: 'Auth',
  components: {
    ProgressDialog
  },
  data () {
    return {
      text: {
        title: { en: 'Login', zh: '登入' },
        inputId: { en: 'Student／Tempcard ID', zh: '學號／臨時證證號' },
        inputPassword: { en: 'Password', zh: '密碼' },
        inputPasswordHint: { en: 'NTUT Portal password or Tempcard ID last 4 characters', zh: '入口網密碼／臨時證證號末四碼' },
        submit: { en: 'Submit', zh: '送出' },
        required: { en: '*Required', zh: '*必填' },
        invalidIdPwd: { en: 'Invalid ID or Password', zh: '*錯誤的學號或臨時證證號或密碼' },
        unknownError: { en: 'Unknown Error', zh: '*未知錯誤' }
      },
      inputs: {
        id: '',
        password: ''
      },
      validator: {
        required: input => !!input
      },
      isLoading: false,
      canSkip: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState([
      'language',
      'characterIndex',
      'token',
      'loadedData',
      'showProgressDialog'
    ])

  },
  methods: {
    ...mapActions([
      'setToken',
      'setCharacterIndex',
      'loadCharacterData',
      'setShowProgressDialog',
      'setProgressDialogText'
    ]),
    async auth () {
      const { characterIndex, token } = await api.auth({
        id: this.inputs.id.toLowerCase(),
        password: this.inputs.password
      })
      this.setToken(token)
      this.setCharacterIndex(characterIndex)
    },
    async loadData () {
      await this.loadCharacterData()
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
    },
    async onSubmit () {
      if (!this.$refs.form.validate()) return
      this.setShowProgressDialog(true)
      this.setProgressDialogText('Auth...')
      try {
        await this.auth()
        this.errorMessage = ''
      } catch (error) {
        const status = error.response.status
        switch (status) {
          case 404:
            this.errorMessage = this.text.invalidIdPwd[this.language]
            break
          default:
            this.errorMessage = this.text.unknownError[this.language]
            break
        }
        this.setShowProgressDialog(false)
        return
      }
      this.setProgressDialogText('Loading Character Data...')
      await this.loadData()
      this.setShowProgressDialog(false)
      this.setProgressDialogText('')
      this.$emit('change-subview', 'Character')
    },
    async skip () {
      this.setShowProgressDialog(true)
      this.setProgressDialogText('Load Character Data...')
      await this.loadData()
      this.setShowProgressDialog(false)
      this.setProgressDialogText('')
      this.$emit('change-subview', 'Wait')
    }
  },
  created () {
    if (this.token && Number.isSafeInteger(this.characterIndex)) {
      this.canSkip = true
      this.skip()
    }
  }
}
</script>
