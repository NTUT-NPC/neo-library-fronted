<template>
  <BorrowReturn
    type="borrow"
    resource="book"
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
        description: { en: 'Please enter the password you got into the official document and follow the instructions to complete the task.', zh: '請將得到之密碼輸入至公文並依照指示完成任務' }
      }
    }
  }
}
</script>

<style>
</style>
