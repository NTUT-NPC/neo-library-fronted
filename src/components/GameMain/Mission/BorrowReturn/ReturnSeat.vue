<template>
  <BorrowReturn
    type="return"
    resource="seat"
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
        description: { en: 'Please unregister your seat using the seat registration kiosk', zh: '請至自助選位機歸還座位' }
      }
    }
  }
}
</script>
