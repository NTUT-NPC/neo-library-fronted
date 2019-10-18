<template>
  <div class="fill-parent">
    <component
      v-if="currentStage"
      v-show="!showGainItemDialog"
      :is="subview"
      @stage-clear="onStageClear"
      @stage-jump="jumpTo"
    ></component>
    <GainItemDialog
      v-model="showGainItemDialog"
      :items="gainedItems"
      @input="!$event && onCloseGainItemDialog()"
    ></GainItemDialog>
    <v-bottom-navigation
      v-show="!showGainItemDialog && !hideNavBottom"
      v-model="bottomNav"
      dark
      fixed
      style="background-color: rgba(0, 0, 0, 0.7)"
    >
      <v-btn :class="{ 'flash-fast': hasNewItem }" @click="hasNewItem = false">
        <span>{{ inventoryIcon.text }}</span>
        <div class="icon" :style="`background-image: url(${inventoryIcon.base64Src});`"></div>
      </v-btn>
      <v-btn>
        <span>{{ homeIcon.text }}</span>
        <div class="icon" :style="`background-image: url(${homeIcon.base64Src});`"></div>
      </v-btn>
      <v-btn :class="{ 'flash-fast': hasNewReview }" @click="hasNewReview = false">
        <span>{{ reviewIcon.text }}</span>
        <div class="icon" :style="`background-image: url(${reviewIcon.base64Src});`"></div>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import subviews from '@/subviews/GameMain'
import GainItemDialog from '@/components/GameMain/GainItemDialog'

export default {
  name: 'GameMain',
  components: {
    ...subviews,
    GainItemDialog
  },
  computed: {
    ...mapState({
      loadedData: 'loadedData',
      _currentStageIndex: 'currentStageIndex',
      hasCompleteGameMain: 'hasCompleteGameMain'
    }),
    ...mapGetters([
      'stages',
      'currentStage'
    ]),
    currentStageIndex: {
      get () {
        return this._currentStageIndex
      },
      set (value) {
        this.setCurrentStageIndex(value)
      }
    },
    hideNavBottom () {
      if (!this.currentStage) return false
      return !!this.currentStage.hideNavBottom
    },
    inventoryIcon () {
      return this.loadedData['common/icons/inventory']
    },
    homeIcon () {
      return this.loadedData['common/icons/home']
    },
    reviewIcon () {
      return this.loadedData['common/icons/review']
    },
    stageView () {
      return this.currentStage.type
    },
    subview () {
      const subviews = ['Inventory', this.stageView, 'Review']
      return subviews[this.bottomNav]
    },
    events () {
      if (!this.currentStage) return []
      return this.currentStage.events || []
    },
    toJump () {
      if (!this.events.filter(event => event.name === 'jumpTo').length) return null
      return this.events.filter(event => event.name === 'jumpTo').pop().obj
    },
    toExit () {
      return !!this.events.filter(event => event.name === 'exit').length
    }
  },
  data () {
    return {
      bottomNav: 1,
      showGainItemDialog: false,
      gainedItems: [],
      hasNewItem: false,
      hasNewReview: false
    }
  },
  methods: {
    ...mapActions([
      'setCurrentStageIndex',
      'addInventory',
      'addReview',
      'completeGameMain'
    ]),
    onStageClear () {
      const temp = {
        toJump: this.toJump,
        toExit: this.toExit
      }
      this.triggerEvents('leave')
      if (!temp.toJump && !temp.toExit) {
        this.currentStageIndex += 1
      }
      this.triggerEvents('enter')
    },
    jumpTo (stageName) {
      let isBreak = false
      this.stages.forEach((stage, stageIndex) => {
        if (!isBreak && stage.name === stageName) {
          this.currentStageIndex = stageIndex
          console.log(stageIndex)
          isBreak = true
        }
      })
    },
    gainItem (itemIds) {
      this.showGainItemDialog = true
      this.gainedItems = itemIds.map(itemId => this.loadedData[`common/items/${itemId}`])
      for (const itemId of itemIds) {
        this.addInventory(itemId)
      }
      this.hasNewItem = true
    },
    gainReview (reviewIds) {
      for (const reviewId of reviewIds) {
        this.addReview(reviewId)
      }
      this.hasNewReview = true
    },
    exit () {
      this.completeGameMain()
      this.$emit('change-view', 'GameForm')
    },
    onCloseGainItemDialog () {
      this.gainedItems = []
    },
    triggerEvents (type) {
      this.events
        .filter(event => event.type === type)
        .forEach(event => {
          // this.events.splice(this.events.indexOf(event))
          this[event.name](event.obj)
        })
    }
  },
  created () {
    if (this.hasCompleteGameMain) this.$emit('change-view', 'GameForm')
  },
  mounted () {
    if (this.currentStageIndex === null) {
      this.currentStageIndex = 0
    } else {
      const temp = this.currentStageIndex
      this.currentStageIndex = null
      this.currentStageIndex = temp
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  background-size: cover;
  width: 48px;
  height: 48px;
}
</style>
