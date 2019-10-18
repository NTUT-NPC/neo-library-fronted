<template>
  <div class="d-flex justify-center align-center">
    <div class="text-center">
      <p class="font-size-3 mb-5">{{ description }}</p>
      <p class="mb-0 font-size-2 error--text">{{ errorMessage }}</p>
      <v-btn
        class="font-size-2"
        color="primary"
        rounded
        large
        @click="onClickCheck"
      >{{ text.btnCheck[language] }}</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import createPrivateAPI from '@/api/private'

export default {
  props: [
    'description',
    'type',
    'resource'
  ],
  computed: {
    ...mapState([
      'token',
      'language'
    ])
  },
  data () {
    return {
      api: null,
      text: {
        uncompleted: { en: 'Mission is still not completed', zh: '任務尚未完成' },
        btnCheck: { en: 'Check', zh: '任務檢查' }
      },
      errorMessage: ''
    }
  },
  methods: {
    async onClickCheck () {
      this.errorMessage = ''
      await this.api.updateMissionStatus()
      if (await this.api.getMissionStatus(`${this.resource.toLowerCase()}s/${this.type.toLowerCase()}_status`)) {
        this.$emit('mission-complete')
      } else {
        this.errorMessage = this.text.uncompleted[this.language]
        setTimeout(() => { this.errorMessage = '' }, 3000)
      }
    }
  },
  created () {
    this.api = createPrivateAPI(this.token)
  }
}
</script>
