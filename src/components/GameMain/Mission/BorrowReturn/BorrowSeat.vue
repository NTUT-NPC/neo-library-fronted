<template>
  <BorrowReturn
    type="borrow"
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
        description: { en: 'Please register a seat in the Mountain of Flames Section using the seat registration kiosk', zh: '請至自助選位機登記位於火燄山的座位' }
      }
    }
  }
}
</script>
