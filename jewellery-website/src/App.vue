<script setup lang="ts">
import Header from "./components/header.vue"
</script>

<template>
  <div class="app-container">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
