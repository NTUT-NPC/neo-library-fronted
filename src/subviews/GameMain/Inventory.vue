<template>
  <v-img
    height="100%"
    style="position: relative;"
    :src="loadedData['common/others/backgroundB'].base64Src"
  >
    <div class="inventory-container pa-3">
      <v-row v-if="inventory.length">
        <v-col v-for="item in items" :key="`item-${item.id}`" cols="6">
          <v-card class="fill-parent d-flex justify-center align-center">
            <v-img :src="item.base64Src" cover @click="onClickItem(item.base64Src)"></v-img>
          </v-card>
        </v-col>
      </v-row>
      <div
        v-else
        class="text-center font-size-4 fill-parent d-flex justify-center align-center grey--text"
      >{{ text.empty[language] }}</div>
      <v-dialog v-model="showItemDialog" max-width="90%">
        <v-img :src="itemDialogImage" @click="onClickItemImage"></v-img>
      </v-dialog>
    </div>
  </v-img>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'inventory',
      'loadedData',
      'language'
    ]),
    items () {
      return this.inventory.map(itemId => this.loadedData[`common/items/${itemId}`])
    }
  },
  data () {
    return {
      showItemDialog: false,
      itemDialogImage: '',
      text: {
        empty: { en: 'Empty', zh: '空無一物' }
      }
    }
  },
  methods: {
    onClickItem (src) {
      this.showItemDialog = true
      this.itemDialogImage = src
    },
    onClickItemImage () {
      this.showItemDialog = false
      this.itemDialogImage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.inventory-container {
  max-width: 767px;
  margin: auto;
  overflow-y: auto;
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 14%;
}
</style>
