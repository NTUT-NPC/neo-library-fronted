<template>
  <v-img height="100%" :src="loadedData['common/others/welcome'].base64Src" @click="onClick">
    <div class="fill-parent d-flex justify-center align-end">
      <div class="font-size-3 pa-5 mb-5 flash font-weight-black text-center">{{ text[language] }}</div>
    </div>
  </v-img>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Welcome',
  data () {
    return {
      text: {
        en: 'Press Anywhere On Screen',
        zh: '點擊螢幕任意處'
      }
    }
  },
  computed: {
    ...mapState([
      'loadedData',
      'language'
    ])
  },
  methods: {
    onClick () {
      this.$emit('change-subview', 'Auth')
    }
  }
}
</script>
