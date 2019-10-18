<template>
  <MoveTo
    :place-text="text.placeText[language]"
    answer="4fg5h6454hg6dg4htdkhd"
    @mission-complete="$emit('mission-complete')"
  ></MoveTo>
</template>

<script>
import { mapState } from 'vuex'
import MoveTo from './MoveTo'
export default {
  components: {
    MoveTo
  },
  computed: {
    ...mapState([
      'language'
    ])
  },
  data () {
    return {
      text: {
        placeText: { en: 'Silken Web（B1）', zh: '（B1）' }
      }
    }
  }
}
</script>
