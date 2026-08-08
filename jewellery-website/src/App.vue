<script setup lang="ts">
import Header from "./components/header.vue"
import Footer from "./components/footer.vue"
import WhatsAppButton from "./components/whatsappbutton.vue"
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
