<template>
  <v-img
    v-show="show"
    height="100%"
    :src="loadedData['common/others/backgroundB'].base64Src"
    @click="show = false"
  >
    <div class="content-container text-center d-flex justify-center align-center">
      <div>
        <div class="font-size-5 mb-5">{{ text.gainItem[language] }}</div>
        <v-img
          width="100"
          height="100"
          class="d-inline-block"
          :src="loadedData['common/icons/inventory'].base64Src"
        ></v-img>
        <div
          v-for="item in items"
          :key="`gainItem-${item.id}`"
          class="font-size-3 py-2"
        >{{ item.text }}</div>
      </div>
    </div>
  </v-img>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GainItemDialog',
  props: [
    'value',
    'items'
  ],
  computed: {
    ...mapState([
      'loadedData',
      'language'
    ]),
    show: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  },
  data () {
    return {
      text: {
        gainItem: { en: 'Obtained Item', zh: '獲得道具' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  position: absolute;
  margin: 0;
  top: 11%;
  left: 10%;
  right: 10%;
  bottom: 14%;
}
</style>
