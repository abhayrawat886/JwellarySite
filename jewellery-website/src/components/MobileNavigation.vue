<template>
  <div class="mobile-nav" :class="{ 'open': isOpen }">
    <div class="mobile-nav-content">
      <router-link to="/" class="mobile-nav-item" @click="$emit('close')">
        Dashboard
      </router-link>

      <div class="mobile-dropdown">
        <div class="mobile-nav-item dropdown-trigger" @click="toggleDropdown">
          Collections
          <svg class="dropdown-icon" :class="{ 'rotated': showDropdown }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="mobile-dropdown-content" :class="{ 'show': showDropdown }">
          <router-link to="/collections?tab=gold" class="sub-item" @click="$emit('close')">Gold Jewellery</router-link>
          <router-link to="/collections?tab=silver" class="sub-item" @click="$emit('close')">Silver Jewellery</router-link>
          <router-link to="/collections?tab=diamond" class="sub-item" @click="$emit('close')">Diamond Jewellery</router-link>
          <router-link to="/collections?tab=gifting" class="sub-item" @click="$emit('close')">Gifting Products</router-link>
          <router-link to="/collections?tab=new-arrivals" class="sub-item" @click="$emit('close')">New Arrivals</router-link>
        </div>
      </div>

      <router-link to="/about" class="mobile-nav-item" @click="$emit('close')">
        About
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Reset dropdown when menu closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) showDropdown.value = false
})
</script>

<style scoped lang="scss">
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: #0a0a0a;
  z-index: 2000;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(212, 175, 55, 0.1);
  padding: 6rem 2rem 2rem;

  &.open {
    right: 0;
  }
}

.mobile-nav-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav-item {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  &.rotated {
    transform: rotate(180deg);
    color: #d4af37;
  }
}

.mobile-dropdown-content {
  display: none;
  flex-direction: column;
  padding-left: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  
  &.show {
    display: flex;
  }

  .sub-item {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding: 0.8rem 0;
    font-size: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);

    &:hover {
      color: #d4af37;
    }
  }
}
</style>
