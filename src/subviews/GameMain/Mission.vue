<template>
  <v-img :src="loadedData['common/others/backgroundB'].base64Src" height="100%">
    <div class="d-flex justify-center align-center fill-parent" style="position: relative;">
      <div class="mission-container">
        <div class="text-center font-size-5" style="height: 12%;">{{ text.mission[language] }}</div>
        <div
          style="height: 88%; overflow-y: auto;"
          class="px-5 py-3 text-center d-flex justify-center align-center"
        >
          <component
            :is="missionComponent"
            @mission-complete="$emit('stage-clear')"
            @stage-jump="$emit('stage-jump', $event)"
          ></component>
        </div>
      </div>
    </div>
  </v-img>
</template>

<script>
import missionComponents from '@/components/GameMain/Mission'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      text: {
        mission: { en: 'Mission', zh: '任務' }
      }
    }
  },
  components: {
    ...missionComponents
  },
  computed: {
    ...mapState([
      'loadedData',
      'language'
    ]),
    ...mapGetters([
      'currentStage'
    ]),
    missionComponent () {
      return this.currentStage.name
    }
  }
}
</script>

<style lang="scss" scoped>
.mission-container {
  position: absolute;
  margin: 0;
  top: 11%;
  left: 10%;
  right: 10%;
  bottom: 14%;
}
</style>
