<template>
  <div class="fill-parent">
    <component :is="subview" @change-view="onChangeView" @change-subview="onChangeSubview"></component>
  </div>
</template>

<script>
import subviews from '@/subviews/GameStart'

export default {
  name: 'GameStart',
  components: {
    ...subviews
  },
  data () {
    return {
      subview: 'SelectLanguage'
    }
  },
  methods: {
    onChangeView (newView) {
      this.$emit('change-view', newView)
    },
    onChangeSubview (newSubview) {
      this.subview = newSubview
    }
  }
}
</script>
