<template>
  <BorrowReturn
    type="borrow"
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
        description: { en: 'Please use your student ID card to borrow a disc from the Culture and Education section (from shelf No. 11 to 13) at the Activity Desk and acquire a number tab.', zh: '請至視聽資料櫃台租借片庫 11 ~ 13 文教類的光碟' }
      }
    }
  }
}
</script>

<style>
</style>
