<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="goToDashboard">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <!-- <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-bg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.2"/>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
            <span class="short-name">RJ</span>
          </div>
          <div class="logo-text">
            <span class="rennu">Rennu</span>
            <span class="jwellers">Jwellers</span>
          </div>
        </div>
      </div>

      <nav class="nav">
        <router-link to="/" class="nav-item" active-class="active">Dashboard</router-link>
        <router-link to="/about" class="nav-item" active-class="active">About</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
  router.push('/')
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
  max-width: 1400px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  cursor: pointer;
  transition: opacity 0.2s ease;

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
    overflow: hidden;
    border: 2px solid #d4af37;

    .icon-bg {
      position: absolute;
      width: 100%;
      height: 100%;
    }

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

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .nav {
    gap: 1.2rem;
  }
}
</style>