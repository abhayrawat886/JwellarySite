<template>
  <div class="product-grid-system">
    <div class="grid-controls">
      <div class="view-as">
        <span class="label">VIEW AS</span>
        <div class="control-icons">
          <!-- Grid View Icon -->
          <button 
            :class="['grid-btn', { active: currentGrid === 4 }]"
            @click="setGrid(4)"
            title="Grid View"
          >
            <svg class="view-icon" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          
          <!-- List View Icon -->
          <button 
            :class="['grid-btn', { active: currentGrid === 1 }]"
            @click="setGrid(1)"
            title="List View"
          >
            <svg class="view-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Sort options -->
      <div class="sort-options">
        <span class="label">SORT BY</span>
        <select v-model="sortBy" class="sort-select">
          <option value="best-selling">Featured</option>
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
        </select>
      </div>
    </div>

    <div :class="['grid-container', `grid-cols-${currentGrid}`]">
      <div 
        v-for="product in sortedProducts" 
        :key="product.id" 
        class="product-card"
        @click="goToDetail(product.id)"
      >
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import giftingData from '../assets/data/gifting.json'

const router = useRouter()
const products = ref(giftingData)
const currentGrid = ref(4)
const sortBy = ref('best-selling')
const activeImageMap = ref({})

const giftingImages = import.meta.glob('../assets/gifting folder/*.{JPG,jpg,jpeg,png,avif,webp}', { eager: true, import: 'default' })
const productItemsImages = import.meta.glob('../assets/productItems/*.{JPG,jpg,jpeg,png,avif,webp}', { eager: true, import: 'default' })

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

const setGrid = (cols) => {
  currentGrid.value = cols
}

const sortedProducts = computed(() => {
  let sorted = [...products.value]
  
  switch (sortBy.value) {
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'best-selling':
      return sorted.sort((a, b) => a.bestSelling - b.bestSelling)
    default:
      return sorted
  }
})
</script>

<style scoped lang="scss">
.product-grid-system {
  padding: 2rem;
  font-family: 'Outfit', sans-serif;
}

.grid-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .view-as, .sort-options {
    display: flex;
    align-items: center;
    gap: 1rem;

    .label {
      font-size: 0.8rem;
      font-weight: 700;
      color: #666;
      letter-spacing: 1px;
    }
  }

  .control-icons {
    display: flex;
    gap: 0.5rem;
  }

  .sort-select {
    padding: 0.5rem 2rem 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-family: 'Outfit', sans-serif;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    background-size: 1rem;

    &:focus {
      border-color: #d4af37;
    }
  }
}

.grid-btn {
  background: white;
  border: 1px solid #ddd;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;

  .view-icon {
    width: 20px;
    height: 20px;
    color: #ccc;
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: #d4af37;
    .view-icon { color: #d4af37; }
  }

  &.active {
    background: #000;
    border-color: #000;
    .view-icon { color: #fff; }
  }
}

.grid-container {
  display: grid;
  gap: 2rem;
  transition: all 0.4s ease;

  &.grid-cols-1 {
    grid-template-columns: 1fr;
    
    .product-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      text-align: left;

      .image-wrapper {
        width: 200px;
        height: 200px;
        flex-shrink: 0;
        aspect-ratio: auto;
      }

      .product-info {
        text-align: left;
        padding: 0;
      }
    }
  }

  &.grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);

    .product-card .image-wrapper {
      max-width: 450px;
      min-height: 200px;
      margin: 0 auto;
    }
  }

  &.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  &.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

.product-card {
  background: white;
  transition: transform 0.3s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    .carousel-arrow { opacity: 1; }
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1/1;
    background: #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
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
    padding: 1.2rem 0;
    text-align: center;

    .product-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #222;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .product-description {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-price {
      font-size: 1.2rem;
      font-weight: 700;
      color: #d4af37;
    }
  }
}

// Mobile responsiveness for the grid
@media (max-width: 1024px) {
  .grid-container.grid-cols-4 { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .product-grid-system { padding: 1rem; }
  .grid-container.grid-cols-4, 
  .grid-container.grid-cols-3 { grid-template-columns: repeat(2, 1fr); }
  
  .grid-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    
    .view-as, .sort-options {
      width: 100%;
      justify-content: space-between;
    }
  }
}

@media (max-width: 480px) {
  .grid-container { grid-template-columns: 1fr !important; }
  
  .grid-container.grid-cols-1 .product-card {
    flex-direction: column;
    text-align: center;
    
    .image-wrapper {
      width: 100%;
      height: auto;
    }
    
    .product-info {
      text-align: center;
    }
  }
}
</style>
