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

      <!-- Hamburger Menu Button -->
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

      <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
        <router-link to="/" class="nav-item" active-class="active">Dashboard</router-link>
        <router-link to="/collections" class="nav-item" active-class="active">Collections</router-link>
        <router-link to="/about" class="nav-item" active-class="active">About</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

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
  background: #050505; // Deep black
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
    color: #d4af37; // Metallic 
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

    .rennu {
      color: #d4af37; // Gold
    }

    .jwellers {
      color: #ffffff; // White
    }
  }
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  
  svg {
    width: 28px;
    height: 28px;
  }
}

.nav {
  display: flex;
  gap: 2.5rem;

  .nav-item {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    transition: all 0.3s ease;
    padding: 0.5rem 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: #d4af37;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover {
      color: #ffffff;
      
      &::after {
        width: 100%;
      }
    }

    &.active {
      color: #d4af37;
      
      &::after {
        width: 100%;
        background: #d4af37;
      }
    }
  }
}

@media (max-width: 1200px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    position: fixed;
    top: 0;
    width: 280px;
    height: 100vh;
    background: #0a0a0a;
    flex-direction: column;
    padding: 6rem 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
    border-left: 1px solid rgba(212, 175, 55, 0.1);
    display: none;

    &.nav-open {
      right: 0;
      display: flex;
    }

    .nav-item {
      font-size: 1.1rem;
      width: 100%;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);

      &::after {
        left: 0;
        transform: none;
        bottom: 0;
      }
    }
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