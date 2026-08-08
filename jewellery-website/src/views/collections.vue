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

    <div class="subcategory-tabs-container" v-if="activeTab === 'gifting' && subCategories.length > 1">
      <div class="container">
        <div class="subcategory-tabs">
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
        <!-- Display coming soon banner for categories without real items -->
        <div v-if="activeTab !== 'gifting'" class="coming-soon-wrapper">
          <div class="coming-soon-card">
            <div class="sparkle-icon">✨</div>
            <h2>More Items Coming Soon in Future</h2>
            <p>We are currently updating our {{ activeCollectionName }} category with genuine handcrafted pieces. Check back soon!</p>
            <button class="explore-gifting-btn" @click="switchToGifting">
              Explore Gifting Products &rarr;
            </button>
          </div>
        </div>

        <!-- Real Gifting Products Grid -->
        <template v-else>
          <div class="products-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="goToDetail(product.id)">
              <div class="image-wrapper">
                <img v-if="getActiveImage(product)" :src="getImageUrl(getActiveImage(product))" :alt="product.name" loading="lazy" decoding="async" />
                <div v-else class="letter-placeholder">
                  <span>{{ (product.category || 'P').charAt(0).toUpperCase() }}</span>
                </div>

                <!-- Carousel Controls for Multi-Image Items -->
                <div v-if="product.images && product.images.length > 1" class="carousel-controls">
                  <button class="carousel-arrow prev" @click="prevImage(product, $event)" title="Previous Image">
                    &#10094;
                  </button>
                  <button class="carousel-arrow next" @click="nextImage(product, $event)" title="Next Image">
                    &#10095;
                  </button>
                  <div class="carousel-dots">
                    <span 
                      v-for="(img, idx) in product.images" 
                      :key="idx" 
                      :class="['dot', { active: (activeImageMap[product.id] || 0) === idx }]"
                      @click="setImageIndex(product, idx, $event)"
                    ></span>
                  </div>
                </div>

                <!-- Image Counter Badge -->
                <div v-if="product.images && product.images.length > 1" class="image-count-badge">
                  {{ (activeImageMap[product.id] || 0) + 1 }} / {{ product.images.length }}
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <p v-if="product.price" class="product-price">{{ product.price }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="filteredProducts.length === 0" class="no-products">
            No products found in this category.
          </div>
        </template>
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

// Dynamic asset resolution for gifting folder and productItems
const giftingImages = import.meta.glob('../assets/gifting folder/*.{JPG,jpg,jpeg,png,avif,webp}', { eager: true, import: 'default' })
const productItemsImages = import.meta.glob('../assets/productItems/*.{JPG,jpg,jpeg,png,avif,webp}', { eager: true, import: 'default' })

const router = useRouter()
const route = useRoute()
const activeTab = ref('gifting')
const activeSubCategory = ref('All')
const isCompact = ref(false)
const activeImageMap = ref({})

const handleScroll = () => {
  isCompact.value = window.scrollY > 50
}

const tabs = [
  { id: 'gifting', name: 'Gifting Products', data: giftingData, bg: bgGifting },
  { id: 'gold', name: 'Gold Jewellery', data: goldData, bg: bgGold },
  { id: 'silver', name: 'Silver Jewellery', data: silverData, bg: bgSilver },
  { id: 'diamond', name: 'Diamond Jewellery', data: diamondData, bg: bgDiamond },
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

const subCategories = computed(() => {
  if (activeTab.value === 'gifting') {
    return ['All', 'Pooja & Spiritual', 'Home & Desk Decor', 'Wall & Frame Decor', 'Utility & Box Sets']
  }
  return ['All', 'Necklaces', 'Chains', 'Rings', 'Earrings', 'Bangles & Bracelets', 'Others']
})

const filteredProducts = computed(() => {
  if (activeSubCategory.value === 'All') return currentProducts.value
  
  return currentProducts.value.filter(p => {
    return p.type === activeSubCategory.value
  })
})

const getImageUrl = (name) => {
  if (!name) return ''
  const giftingKey = `../assets/gifting folder/${name}`
  if (giftingImages[giftingKey]) return giftingImages[giftingKey]

  const productKey = `../assets/productItems/${name}`
  if (productItemsImages[productKey]) return productItemsImages[productKey]

  return ''
}

const getActiveImage = (product) => {
  if (product.images && product.images.length > 0) {
    const idx = activeImageMap.value[product.id] || 0
    return product.images[idx]
  }
  return product.image
}

const nextImage = (product, e) => {
  e.stopPropagation()
  if (!product.images || product.images.length <= 1) return
  const curr = activeImageMap.value[product.id] || 0
  activeImageMap.value[product.id] = (curr + 1) % product.images.length
}

const prevImage = (product, e) => {
  e.stopPropagation()
  if (!product.images || product.images.length <= 1) return
  const curr = activeImageMap.value[product.id] || 0
  activeImageMap.value[product.id] = (curr - 1 + product.images.length) % product.images.length
}

const setImageIndex = (product, idx, e) => {
  e.stopPropagation()
  activeImageMap.value[product.id] = idx
}

const goToDetail = (id) => {
  router.push(`/collections/${id}`)
}

const switchToGifting = () => {
  activeTab.value = 'gifting'
  activeSubCategory.value = 'All'
  router.push({ path: '/collections', query: { tab: 'gifting' } })
}

// Logic to handle tab from query params
const updateTabFromQuery = () => {
  const tabQuery = route.query.tab
  if (tabQuery && tabs.some(t => t.id === tabQuery)) {
    activeTab.value = tabQuery
    activeSubCategory.value = 'All'
  } else if (!route.query.tab) {
    activeTab.value = 'gifting'
    activeSubCategory.value = 'All'
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
  background-color: #050505;
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

/* Coming Soon Section */
.coming-soon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
}

.coming-soon-card {
  background: linear-gradient(145deg, #111111 0%, #1a1a1a 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 24px;
  padding: 4rem 3rem;
  text-align: center;
  max-width: 650px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  .sparkle-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #d4af37;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  .explore-gifting-btn {
    background: #d4af37;
    color: #000;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #fff;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
    }
  }
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
    .carousel-arrow { opacity: 1; }
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1/1;
    overflow: hidden;
    background: #f8f8f8;
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

    /* Carousel Overlay Controls */
    .carousel-controls {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.5rem;

      .carousel-arrow {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.85);
        color: #111;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);

        &:hover {
          background: #000;
          color: #fff;
        }
      }

      .carousel-dots {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 6px;
        pointer-events: auto;
        background: rgba(0, 0, 0, 0.4);
        padding: 4px 8px;
        border-radius: 12px;
        backdrop-filter: blur(4px);

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.2s ease;

          &.active {
            background: #d4af37;
            width: 14px;
            border-radius: 10px;
          }
        }
      }
    }

    .image-count-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.65);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 12px;
      backdrop-filter: blur(4px);
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
  .coming-soon-card {
    padding: 3rem 1.5rem;
    h2 { font-size: 1.5rem; }
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

