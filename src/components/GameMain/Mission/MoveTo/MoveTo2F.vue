<template>
  <MoveTo
    :place-text="text.placeText[language]"
    answer="gfj54df5d4sagfhj"
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
        placeText: { en: 'Mountain of Flames（2F）', zh: '火焰山（2F）' }
      }
    }
  }
}
</script>
