<template>
  <nav class="desktop-nav">
    <router-link to="/" class="nav-item" active-class="active">Dashboard</router-link>
    
    <div class="nav-item-dropdown" v-click-outside="closeDropdown">
      <div class="nav-item dropdown-trigger" 
        :class="{ 'active': $route.path === '/collections' || showDropdown }"
        @click.stop="toggleDropdown"
      >
        Collections
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      <div class="dropdown-menu" :class="{ 'show': showDropdown }">
        <router-link to="/collections?tab=gold" class="dropdown-item" @click="closeDropdown">Gold Jewellery</router-link>
        <router-link to="/collections?tab=silver" class="dropdown-item" @click="closeDropdown">Silver Jewellery</router-link>
        <router-link to="/collections?tab=diamond" class="dropdown-item" @click="closeDropdown">Diamond Jewellery</router-link>
        <router-link to="/collections?tab=gifting" class="dropdown-item" @click="closeDropdown">Gifting Products</router-link>
        <router-link to="/collections?tab=new-arrivals" class="dropdown-item" @click="closeDropdown">New Arrivals</router-link>
      </div>
    </div>

    <router-link to="/about" class="nav-item" active-class="active">About</router-link>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

// Custom directive for clicking outside
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped lang="scss">
.desktop-nav {
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
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;

    .dropdown-icon {
      width: 14px;
      height: 14px;
      color: #ffffff;
      transition: transform 0.3s ease;
      stroke-width: 2.5;
    }

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
      &::after { width: 100%; }
    }

    &.active {
      color: #d4af37;
      &::after {
        width: 100%;
        background: #d4af37;
      }
      .dropdown-icon {
        color: #d4af37;
      }
    }
  }
}

.nav-item-dropdown {
  position: relative;
  
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    min-width: 240px;
    padding: 0.75rem 0;
    border-radius: 12px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.05);
    z-index: 1000;

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 12px;
      height: 12px;
      background: #ffffff;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    &.show {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }

  .dropdown-item {
    display: block;
    padding: 0.85rem 1.5rem;
    color: #333333;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.25s ease;
    white-space: nowrap;
    position: relative;
    z-index: 1;

    &:hover {
      background: linear-gradient(90deg, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 100%);
      color: #d4af37;
      padding-left: 2rem;
      font-weight: 700;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: #d4af37;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    }
  }
}
</style>
