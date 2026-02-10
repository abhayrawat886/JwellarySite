<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="goToDashboard">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <span class="short-name">RJ</span>
          </div>
          <div class="logo-text">
            <span class="rennu">Rennu</span>
            <span class="jwellers">Jwellers</span>
          </div>
        </div>
      </div>

      <!-- Hamburger Menu Button (visible below 1200px) -->
      <button class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen">
        <svg v-if="!isMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Desktop Navigation (hidden below 1200px) -->
      <DesktopNavigation class="desktop-nav-container" />

      <!-- Mobile Navigation (visible below 1200px when toggled) -->
      <MobileNavigation v-if="isMenuOpen" :isOpen="isMenuOpen" @close="closeMenu" />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DesktopNavigation from './DesktopNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'

const router = useRouter()
const isMenuOpen = ref(false)

// Watch isMenuOpen - if false, ensure any sub-states are reset (handled in components)
watch(isMenuOpen, (newValue) => {
  console.log('Menu status changed:', newValue)
})

onMounted(() => {
  console.log('Header Mounted. Initial Menu State:', isMenuOpen.value)
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const goToDashboard = () => {
  router.push('/')
  closeMenu()
}
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #050505;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.85rem 0;
}

.container {
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  cursor: pointer;
  transition: opacity 0.2s ease;
  z-index: 1001;

  &:hover {
    opacity: 0.9;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-icon {
    position: relative;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d4af37;
    border-radius: 50%;
    border: 2px solid #d4af37;

    .short-name {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.85rem;
      z-index: 1;
      margin-top: 2px;
      letter-spacing: -0.5px;
    }
  }

  .logo-text {
    display: flex;
    gap: 0.4rem;
    font-family: 'Outfit', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    .rennu { color: #d4af37; }
    .jwellers { color: #ffffff; }
  }
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 2001;
  
  svg {
    width: 28px;
    height: 28px;
  }
}

// Show toggle below 1200px
@media (max-width: 1200px) {
  .menu-toggle {
    display: block;
  }
  .desktop-nav-container {
    display: none;
  }
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 1.2rem;
  }
  .container {
    padding: 0 1.5rem;
  }
}
</style>