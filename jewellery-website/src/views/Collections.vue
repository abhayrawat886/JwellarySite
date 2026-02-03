<template>
  <div class="collections-page">
    <div class="collections-header">
      <div class="container">
        <h1>Our Collections</h1>
        <p>Explore our wide range of gold, silver, and diamond jewellery.</p>
      </div>
    </div>

    <div class="tabs-container">
      <div class="container">
        <div class="tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="tab-content">
      <div class="container">
        <!-- Reusing ProductGrid concept but with local tab data -->
        <div class="grid-container">
          <div v-for="product in currentProducts" :key="product.id" class="product-card" @click="goToDetail(product.id)">
            <div class="image-wrapper">
              <img :src="getImageUrl(product.image)" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
        <div v-if="currentProducts.length === 0" class="no-products">
          No products found in this category.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Load specific JSON files
import goldData from '../assets/data/gold.json'
import silverData from '../assets/data/silver.json'
import diamondData from '../assets/data/diamond.json'
import giftingData from '../assets/data/gifting.json'
import newArrivalsData from '../assets/data/newArrivals.json'

const router = useRouter()
const route = useRoute()
const activeTab = ref('gold')

const tabs = [
  { id: 'gold', name: 'Gold Jewellery', data: goldData },
  { id: 'silver', name: 'Silver Jewellery', data: silverData },
  { id: 'diamond', name: 'Diamond Jewellery', data: diamondData },
  { id: 'gifting', name: 'Gifting Products', data: giftingData },
  { id: 'new-arrivals', name: 'New Arrivals', data: newArrivalsData }
]

const currentProducts = computed(() => {
  const tab = tabs.find(t => t.id === activeTab.value)
  return tab ? tab.data : []
})

const getImageUrl = (name) => {
  return new URL(`../assets/productItems/${name}`, import.meta.url).href
}

const goToDetail = (id) => {
  router.push(`/collections/${id}`)
}

// Logic to handle tab from query params
const updateTabFromQuery = () => {
  const tabQuery = route.query.tab
  if (tabQuery && tabs.some(t => t.id === tabQuery)) {
    activeTab.value = tabQuery
  }
}

watch(() => route.query.tab, () => {
  updateTabFromQuery()
})

onMounted(() => {
  updateTabFromQuery()
  window.scrollTo(0, 0)
})
</script>

<style scoped lang="scss">
.collections-page {
  font-family: 'Outfit', sans-serif;
  min-height: 80vh;
  background: #fdfdfd;
}

.collections-header {
  background: #050505;
  color: #fff;
  padding: 5rem 0;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #d4af37;
  }
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
  }
}

.tabs-container {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 70px; // Adjusted for header height
  z-index: 100;

  .container {
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar { display: none; }
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    white-space: nowrap;
    padding: 0.5rem 1rem;
    min-width: max-content;
    margin: 0 auto;
  }
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 1.2rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 0;
    height: 3px;
    background: #d4af37;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #000;
    background: rgba(212, 175, 55, 0.05);
  }

  &.active {
    color: #d4af37;
    &::after { width: 80%; }
  }
}

@media (max-width: 768px) {
  .tabs-container {
    top: 60px; // Adjust for mobile header
    
    .tabs {
      justify-content: flex-start; // Align to left for better scroll experience
    }
  }

  .tab-btn {
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }
}

.tab-content {
  padding: 4rem 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  padding: 0px 20px; 
}

.product-card {
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    .image-wrapper img { transform: scale(1.05); }
  }

  .image-wrapper {
    aspect-ratio: 1/1;
    overflow: hidden;
    background: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 1.2rem;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  .product-info {
    text-align: center;
    
    .product-name {
      font-size: 1rem;
      font-weight: 600;
      color: #111;
      margin-bottom: 0.4rem;
    }
    .product-description {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .product-price {
      font-weight: 700;
      color: #d4af37;
      font-size: 1.1rem;
    }
  }
}

.no-products {
  text-align: center;
  padding: 4rem;
  color: #888;
  font-size: 1.2rem;
}

@media (max-width: 1200px) {
  .grid-container { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .header-content h1 { font-size: 2.2rem; }
  .grid-container { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .tabs { justify-content: flex-start; }
}

@media (max-width: 480px) {
  .grid-container { grid-template-columns: 1fr; }
}
</style>
