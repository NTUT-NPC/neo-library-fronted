<template>
  <BorrowReturn
    type="return"
    resource="video"
    :description="text.description[language]"
    @mission-complete="$emit('mission-complete')"
  ></BorrowReturn>
</template>

<script>
import { mapState } from 'vuex'
import BorrowReturn from './BorrowReturn'

export default {
  components: {
    BorrowReturn
  },
  computed: {
    ...mapState([
      'language'
    ])
  },
  data () {
    return {
      text: {
        description: { en: 'Please return the CD', zh: '請將光碟歸還' }
      }
    }
  }
}
</script>
