<template>
  <v-app>
    <v-content>
      <v-responsive :aspect-ratio="9/16"></v-responsive>
    </v-content>
  </v-app>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  line-height: 1;
  box-sizing: border-box;
}

body {
  background-color: black;
}

.fill-parent {
  width: 100%;
  height: 100%;
}
</style>
