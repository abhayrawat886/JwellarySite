<script setup lang="ts">
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import WhatsAppButton from "./components/WhatsAppButton.vue"
</script>

<template>
  <div class="app-container">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
    <WhatsAppButton />
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
