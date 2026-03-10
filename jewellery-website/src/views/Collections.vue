<template>
  <div class="collections-page">
    <div class="collections-header" :class="{ compact: isCompact }" :style="headerBgStyle">
      <div class="container header-inner">
        <div class="header-text">
          <h1>{{ activeCollectionName }}</h1>
          <p>Discover our exclusive {{ activeCollectionName.toLowerCase() }} pieces crafted with perfection.</p>
        </div>
      </div>
    </div>
    
    <!-- Spacer prevents the page from jumping when the header shrinks -->
    <div class="header-spacer" :class="{ compact: isCompact }"></div>

    <div class="subcategory-tabs-container" v-if="subCategories.length > 1">
      <div class="container">
        <div class="subcategory-tabs">
          <!-- <button 
            class="sub-tab-btn" 
            :class="{ active: activeSubCategory === 'All' }"
            @click="activeSubCategory = 'All'"
          >
            All Items
          </button> -->
          <button 
            v-for="cat in subCategories" 
            :key="cat"
            :class="['sub-tab-btn', { active: activeSubCategory === cat }]"
            @click="activeSubCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <div class="tab-content">
      <div class="container">
        <div class="products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="goToDetail(product.id)">
            <div class="image-wrapper">
              <img v-if="product.image" :src="getImageUrl(product.image)" :alt="product.name" />
              <div v-else class="letter-placeholder">
                <span>{{ (product.category || 'P').charAt(0).toUpperCase() }}</span>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="filteredProducts.length === 0" class="no-products">
          No products found in this category.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Load specific JSON files
import goldData from '../assets/data/gold.json'
import silverData from '../assets/data/silver.json'
import diamondData from '../assets/data/diamond.json'
import giftingData from '../assets/data/gifting.json'
import newArrivalsData from '../assets/data/newArrivals.json'

// Load dynamic background images
import bgGold from '../assets/images/collections_right_bg.png'
import bgSilver from '../assets/images/collections_silver_bg.png'
import bgDiamond from '../assets/images/collections_diamond_bg.png'
import bgGifting from '../assets/images/collections_gifting_bg.png'
import bgNewArrivals from '../assets/images/collections_new_arrivals_bg.png'

// Fixed subcategories as requested
const displayCategories = [
  'Necklaces',
  'Chains',
  'Rings',
  'Earrings',
  'Bangles & Bracelets',
  'Others'
]

const router = useRouter()
const route = useRoute()
const activeTab = ref('gold')
const activeSubCategory = ref(displayCategories[0])
const isCompact = ref(false)

const handleScroll = () => {
  isCompact.value = window.scrollY > 50
}

const tabs = [
  { id: 'gold', name: 'Gold Jewellery', data: goldData, bg: bgGold },
  { id: 'silver', name: 'Silver Jewellery', data: silverData, bg: bgSilver },
  { id: 'diamond', name: 'Diamond Jewellery', data: diamondData, bg: bgDiamond },
  { id: 'gifting', name: 'Gifting Products', data: giftingData, bg: bgGifting },
  { id: 'new-arrivals', name: 'New Arrivals', data: newArrivalsData, bg: bgNewArrivals }
]

const activeCollection = computed(() => {
  return tabs.find(t => t.id === activeTab.value) || tabs[0]
})

const activeCollectionName = computed(() => {
  return activeCollection.value.name
})

const headerBgStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0.85)), url(${activeCollection.value.bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
})

const currentProducts = computed(() => {
  return activeCollection.value.data
})



const subCategories = computed(() => displayCategories)

const filteredProducts = computed(() => {
  if (activeSubCategory.value === 'All') return currentProducts.value
  
  return currentProducts.value.filter(p => {
    return p.type === activeSubCategory.value
  })
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
    activeSubCategory.value = displayCategories[0] // Reset subcategory on tab change
  }
}

watch(() => route.query.tab, () => {
  updateTabFromQuery()
})

onMounted(() => {
  updateTabFromQuery()
  window.scrollTo(0, 0)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.collections-page {
  font-family: 'Outfit', sans-serif;
  min-height: 80vh;
  background: #fdfdfd;
  overflow-anchor: none;
}

.header-spacer {
  height: 0;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-spacer.compact {
  height: 310px;
}

.collections-header {
  background-color: #050505; // Fallback
  color: #fff;
  padding: 5rem 3rem;
  position: sticky;
  top: 70px;
  z-index: 101;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  .header-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-text {
    width: 100%;
    max-width: 800px;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #d4af37;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 50px;
    opacity: 1;
    overflow: hidden;
  }

  &.compact {
    padding: 1rem 3rem;
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0;
    }
    p {
      max-height: 0;
      opacity: 0;
      margin: 0;
    }
  }
}

.subcategory-tabs-container {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 130px;
  z-index: 100;
  padding: 1rem 0;

  .container {
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar { display: none; }
  }

  .subcategory-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
  }
}

.sub-tab-btn {
  background: #f5f5f5;
  border: 1px solid #eee;
  padding: 0.6rem 2rem;
  border-radius: 30px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    background: #eee;
    color: #000;
  }

  &.active {
    background: #000;
    color: #fff;
    border-color: #000;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

.tab-content {
  padding: 4rem 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem 2rem;
  padding: 20px;
}

.product-card {
  background: #fff;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    .image-wrapper img { transform: scale(1.05); }
    .product-name { color: #d4af37; }
  }

  .image-wrapper {
    aspect-ratio: 1/1;
    overflow: hidden;
    background: #f1f1f1;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .letter-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
      color: #d4af37;
      font-size: 2.5rem;
      font-weight: 800;
      text-transform: uppercase;
    }
  }

  .product-info {
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    
    .product-name {
      font-size: 1.15rem;
      font-weight: 600;
      color: #111;
      margin-bottom: 0.6rem;
      transition: color 0.3s ease;
    }
    .product-description {
      font-size: 0.9rem;
      color: #777;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.6;
    }
    .product-price {
      font-weight: 700;
      color: #d4af37;
      font-size: 1.3rem;
      margin-top: auto;
    }
  }
}

.no-products {
  text-align: center;
  padding: 5rem 2rem;
  color: #999;
  font-size: 1.2rem;
  background: #f9f9f9;
  border-radius: 20px;
  border: 2px dashed #eee;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .collections-header {
    top: 60px;
    padding: 3rem 1.5rem;

    .header-text {
      width: 100%;
      text-align: center;
    }

    &.compact {
      padding: 1rem 1.5rem;
    }
  }
  .subcategory-tabs-container {
    top: 120px;
    .subcategory-tabs { justify-content: flex-start; }
  }
  .tab-content { padding: 3rem 0; }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1.2rem;
  }
  .product-card {
    .image-wrapper { margin-bottom: 1rem; border-radius: 8px; }
    .product-name { font-size: 1rem; }
    .product-description { font-size: 0.85rem; }
    .product-price { font-size: 1.1rem; }
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 0.8rem;
  }
  .sub-tab-btn {
    padding: 0.5rem 1.2rem;
    font-size: 0.8rem;
  }
}
</style>
