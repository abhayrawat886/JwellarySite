<template>
  <a
    :href="whatsAppLink"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 whatsapp-pulse"
    aria-label="Chat on WhatsApp"
  >
    <!-- WhatsApp SVG Icon -->
   <span class="button-whatsapp">
    <img class="buttonIcon" :src="whatsappLogo" alt="WhatsApp">
    </span>
  </a>
</template>

<script setup>
import whatsappLogo from '../assets/images/wsImage.webp'

const phoneNumber = '918193979086' // your number with country code
const message = 'Hello, I am interested in your jewellery collection.'

const whatsAppLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
</script>

<style scoped lang="scss">
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
  70% { box-shadow: 0 0 0 15px rgba(34,197,94,0); }
  100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
}

.whatsapp-pulse {
  animation: pulse 2s infinite;
}
.button-whatsapp{
    position: fixed;
    z-index: 99;
    bottom: 30px;
    right: 20px;
}
.buttonIcon{
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
