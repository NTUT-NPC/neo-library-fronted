<template>
  <v-img
    height="100%"
    style="position: relative;"
    :src="loadedData['common/others/backgroundB'].base64Src"
  >
    <div class="form-container pa-3">
      <div class="font-size-4 text-center pb-3">{{ text.title[language] }}</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="inputs.class"
          :items="classes"
          :label="text.class[language]"
          outlined
          :rules="[() => validator.required(inputs.class) || text.required[language]]"
        ></v-select>
        <v-text-field
          v-model="inputs.name"
          :label="text.name[language]"
          outlined
          :rules="[() => validator.required(inputs.name) || text.required[language]]"
        ></v-text-field>
        <v-text-field
          v-model="inputs.studentId"
          :label="text.studentId[language]"
          outlined
          :rules="[() => validator.required(inputs.studentId) || text.required[language]]"
        ></v-text-field>
        <template v-for="i in 5">
          <v-divider :key="`satisfaction-divider-${i}`"></v-divider>
          <Satisfaction
            v-model="inputs[`satisfaction${i}`]"
            :key="`satisfaction-${i}`"
            :title="text[`satisfaction${i}`][language]"
            :left-text="text.leftText[language]"
            :right-text="text.rightText[language]"
            :rules="[() => validator.required(inputs[`satisfaction${i}`]) || text.required[language]]"
          ></Satisfaction>
        </template>
        <v-text-field v-model="inputs.opinion" :label="text.opinion[language]" outlined></v-text-field>
      </v-form>
      <div>
        <v-btn
          class="font-size-2"
          max-width="100%"
          rounded
          block
          color="primary"
          @click="onSubmit"
        >{{ text.submit[language] }}</v-btn>
      </div>
    </div>
  </v-img>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import Satisfaction from '@/components/GameForm/Satisfaction'
import { mapState, mapActions } from 'vuex'
import createPrivateAPI from '@/api/private'

const inputMap = {
  'class': 'entry.1521093633',
  'name': 'entry.342817724',
  'studentId': 'entry.61798308',
  'satisfaction1': 'entry.889901819',
  'satisfaction2': 'entry.469577955',
  'satisfaction3': 'entry.181371955',
  'satisfaction4': 'entry.2090826281',
  'satisfaction5': 'entry.1412301068',
  'opinion': 'entry.404534765',
  'presentType': 'entry.428503296'
}

export default {
  name: 'GameForm',
  components: {
    Satisfaction
  },
  computed: {
    ...mapState([
      'loadedData',
      'language',
      'hasCompleteGameForm',
      'token',
      'showPresentDialog'
    ]),
    classes () {
      return [
        '其他單位',
        '工管一甲',
        '工管一乙',
        '工管一丙',
        '能源一',
        '車輛一',
        '機械一甲',
        '機械一乙',
        '機械一丙',
        '經管一',
        '化工一甲',
        '化工一乙',
        '化工一丙',
        '機電一',
        '資財一甲',
        '工程一',
        '資工一',
        '光電一',
        '文發一',
        '英文一',
        '材資一甲',
        '材資一乙',
        '電子一甲',
        '電子一乙',
        '電子一丙',
        '創意一',
        '工設一',
        '土木一甲',
        '土木一乙',
        '土木一丙',
        '電資一',
        '互動一',
        '分子一',
        '電機一甲',
        '電機一乙',
        '電機一丙',
        '電機一丁',
        '建築一'
      ]
    },
    formData () {
      const formData = {}
      Object.entries(this.inputs).map(entry => ({
        key: inputMap[entry[0]],
        value: entry[1]
      })).forEach(obj => { formData[obj.key] = obj.value })
      return formData
    }
  },
  data () {
    return {
      api: null,
      valid: null,
      inputs: {
        class: null,
        name: null,
        studentId: null,
        satisfaction1: null,
        satisfaction2: null,
        satisfaction3: null,
        satisfaction4: null,
        satisfaction5: null,
        opinion: '',
        presentType: null
      },
      text: {
        title: { en: 'Feedback Form', zh: '尋師旅圖回饋表單' },
        class: { en: 'Class', zh: '班級' },
        name: { en: 'Name', zh: '姓名' },
        studentId: { en: 'Student ID', zh: '學號' },
        satisfaction1: { en: 'Satisfaction with the design of the event (plot, puzzles, etc)', zh: '對於活動設計（劇情、謎題...等）的滿意度' },
        satisfaction2: { en: 'Satisfaction with visual design (characters, posters, color tones, overall design and packaging, etc)', zh: '對於視覺設計（角色、海報、色調、整體設計及包裝...等）的滿意度' },
        satisfaction3: { en: 'Satisfaction with programming (web page navigation, smoothness, user interface, etc)', zh: '對於程式設計（網頁操作、流暢度、使用者介面...等）的滿意度' },
        satisfaction4: { en: 'Satisfaction with explanations by game assistants', zh: '對於小天使說明講解等服務的滿意度？' },
        satisfaction5: { en: 'The augmented reality problem-solving format of this activity helps you to understand the functions and services of the library', zh: '這次實境解謎活動的形式，有助於你認識圖書館的各項功能' },
        opinion: { en: 'Other Suggestion：', zh: '其他建議：' },
        leftText: { en: 'Totally Disagree', zh: '非常不認同' },
        rightText: { en: 'Totally Agree', zh: '非常認同' },
        required: { en: '*Required', zh: '*必填' },
        submit: { en: 'Submit！', zh: '送出！' }
      },
      validator: {
        required: input => !!input
      },
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'completeGameForm',
      'setShowProgressDialog',
      'setProgressDialogText'
    ]),
    async onSubmit () {
      if (!this.$refs.form.validate()) return
      const url = 'https://docs.google.com/forms/u/2/d/e/1FAIpQLSeX-UVrRjKShTl4MaDO_A7U5Qzy8BA4c5NCTavakjpN7b7fFg/formResponse'
      this.setShowProgressDialog(true)
      this.setProgressDialogText('Submitting...')
      this.inputs.presentType = 1 + await this.api.getPresentType()
      try {
        await axios.post(url, qs.stringify(this.formData))
      } catch (error) {}
      this.setShowProgressDialog(false)
      this.setProgressDialogText('')
      this.completeGameForm()
      this.$emit('change-view', 'GamePresent')
    }
  },
  created () {
    if (this.hasCompleteGameForm) {
      this.$emit('change-view', 'GamePresent')
      return
    }
    this.api = createPrivateAPI(this.token)
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 767px;
  margin: auto;
  overflow-y: auto;
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 14%;

  .v-form > * {
    margin-top: 16px;
  }
}
</style>
