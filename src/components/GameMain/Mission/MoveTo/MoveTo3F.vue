<template>
  <MoveTo
    :place-text="text.placeText[language]"
    answer="jk5f4jk64hgd65d4fgdfg"
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
        placeText: { en: 'Tripitaka Library（3F）', zh: '藏經閣（3F）' }
      }
    }
  }
}
</script>
