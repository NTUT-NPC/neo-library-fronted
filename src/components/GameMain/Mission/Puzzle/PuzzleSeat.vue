<template>
  <div class="text-center fill-parent">
    <v-dialog v-model="showPassDialog" persistent fullscreen>
      <v-img height="100%" :src="currentStage.base64Src" @click="showPassDialog = false"></v-img>
    </v-dialog>
    <v-dialog v-model="showHintDialog" max-width="80%">
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="!hasHint"
          class="mb-3 font-size-2"
          :outlined="!hasHint"
          rounded
          :dark="hasHint"
          :color="flags.hint2 ? '#35286c' : 'primary'"
          v-on="on"
        >
          <v-icon size="20" left>mdi-lightbulb-on</v-icon>
          {{ hintText[language] }}
        </v-btn>
      </template>
      <v-card class="pa-3">
        <p class="font-size-4 text-center mb-5">{{ hintText[language] }}</p>
        <div class="font-size-2 text-center" style="overflow-x: auto;">
          <table>
            <tr
              v-for="(row, rowIndex) in currentHint"
              :key="`hint-row-${rowIndex}`"
              style="height: 36px;"
            >
              <td v-for="(col, colIndex) in row" :key="`hint-row-${rowIndex}-col-${colIndex}`">
                <div
                  class="elevation-1"
                  style="width: 36px; height: 36px; line-height: 36px;"
                >{{ col }}</div>
              </td>
            </tr>
          </table>
        </div>
      </v-card>
    </v-dialog>
    <p class="py-1 font-size-3">{{ text.question[language] }}</p>
    <div class="ma-auto" style="width: 200px;">
      <v-text-field
        v-model="answer"
        class="mt-3"
        color="primary"
        :label="text.yourAnswer[language]"
        outlined
        :error="error"
        :error-messages="errorMessage"
        :disabled="flags.pass"
        @keypress.enter="onClickCheck"
      ></v-text-field>
    </div>
    <div class="pb-2">
      <v-btn
        class="font-size-2"
        color="primary"
        rounded
        @click="onClickCheck"
      >{{ text.check[language] }}</v-btn>
    </div>
    <v-snackbar v-model="showSnackbar" top :timeout="3000">
      <div class="fill-parent text-center">{{ text.newHint[language] }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

const answer = 'library'
const hint1Time = 5 * 60 * 1000
const hint2Time = 8 * 60 * 1000
const passTime = 11 * 60 * 1000

export default {
  computed: {
    ...mapState([
      'language'
    ]),
    ...mapGetters([
      'currentStage'
    ]),
    hintText () {
      if (this.flags.hint2) return { en: 'Advanced Hint', zh: '進階提示' }
      else if (this.flags.hint1) return { en: 'Normal Hint', zh: '普通提示' }
      else return { en: 'No Hint', zh: '沒有提示' }
    },
    hasHint () {
      return this.flags.hint1 || this.flags.hint2
    },
    currentHint () {
      if (this.flags.hint2) return this.currentStage.hints[1]

      if (this.flags.hint1) return this.currentStage.hints[0]

      return null
    }
  },
  data () {
    return {
      answer: '',
      text: {
        question: { en: 'Please take Puzzle 1 out from your toolkit and enter your answers in the dialogue box', zh: '請拿出實體道具包中的謎題一，解開謎題並將答案輸入驗證' },
        error: { en: 'Wrong answer！', zh: '這不是正確解答！' },
        check: { en: 'Check', zh: '任務檢查' },
        label: { en: 'Your answer', zh: '你的答案' },
        newHint: { en: 'New Hint！', zh: '獲得新提示！' },
        yourAnswer: { en: 'Your Answer', zh: '你的答案' }
      },
      error: false,
      errorMessage: '',
      timestamp: Number(localStorage.getItem('puzzleSeatTimestamp')),
      flags: {
        hint1: false,
        hint2: false,
        pass: false
      },
      showHintDialog: false,
      showSnackbar: false,
      showPassDialog: false
    }
  },
  methods: {
    onClickCheck () {
      if (answer === this.answer.trim().toLowerCase()) {
        this.$emit('mission-complete')
        return
      }

      this.error = true
      this.errorMessage = this.text.error[this.language]
    }
  },
  mounted () {
    if (!this.timestamp) {
      this.timestamp = Date.now()
      localStorage.setItem('puzzleSeatTimestamp', this.timestamp)
    }

    const timeout = {
      hint1: (this.timestamp + hint1Time) - Date.now(),
      hint2: (this.timestamp + hint2Time) - Date.now(),
      pass: (this.timestamp + passTime) - Date.now()
    }

    const callback = {
      hint1: () => {
        this.flags.hint1 = true
        this.showSnackbar = true
      },
      hint2: () => {
        this.flags.hint2 = true
        this.showSnackbar = true
      },
      pass: () => {
        this.flags.pass = true
        this.showPassDialog = true
        this.answer = answer
      }
    }

    Object.keys(timeout).forEach(key => setTimeout(callback[key], timeout[key]))
  }
}
</script>
