<template>
  <div class="pb-5">
    <div class="mb-5 font-size-3 text-center">{{ title }}</div>
    <div class="d-flex justify-center align-center mt-2">
      <div class="font-size-1 text-center" style="width: 90px;">{{ leftText }}</div>
      <v-radio-group
        :rules="rules"
        v-model="satisfaction"
        row
        class="satisfaction-radio-group justify-center"
      >
        <div v-for="i in 5" :key="i" class="text-center">
          <span>{{ i }}</span>
          <v-radio
            class="text-center ma-0 satisfaction-radio"
            :ripple="false"
            color="primary"
            :value="i"
          ></v-radio>
        </div>
      </v-radio-group>
      <div class="font-size-1 text-center" style="width: 90px;">{{ rightText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Satisfaction',
  props: ['value', 'title', 'left-text', 'right-text', 'rules'],
  computed: {
    satisfaction: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.satisfaction-radio-group {
  min-width: 136px;

  &.v-input--selection-controls {
    margin-top: 0;
  }

  & .v-input__slot {
    margin: 0 !important;
  }

  .satisfaction-radio {
    .v-input--selection-controls__input {
      margin-right: 0;
    }
  }
}
</style>
