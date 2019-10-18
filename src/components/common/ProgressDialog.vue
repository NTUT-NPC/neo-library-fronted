<template functional>
  <v-dialog :value="props.value" persistent max-width="300px">
    <v-card color="primary" dark>
      <v-card-text>
        <span>{{ props.message }}</span>
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
