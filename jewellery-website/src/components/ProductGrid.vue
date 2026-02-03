<template>
  <div class="product-grid-system">
    <div class="grid-controls">
      <div class="view-as">
        <span class="label">VIEW AS</span>
        <div class="control-icons">
          <button 
            v-for="n in 4" 
            :key="n" 
            :class="['grid-btn', { active: currentGrid === n }]"
            @click="setGrid(n)"
            :title="`Show ${n} columns`"
          >
            <!-- Vertical lines representing grid columns -->
            <div class="lines-wrapper">
              <span v-for="i in n" :key="i" class="line"></span>
            </div>
          </button>
        </div>
      </div>
      
      <!-- sort by option -->
      <div class="sort-options">
        <span class="label">SORT BY</span>
        <select v-model="sortBy" class="sort-select">
          <option value="best-selling">Best Selling</option>
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
          <option value="low-high">Price, Low to High</option>
          <option value="high-low">Price, High to Low</option>
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
          <img :src="getImageUrl(product.image)" :alt="product.name" />
          <div class="wishlist-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import productsData from '../assets/products.json'

const router = useRouter()
const products = ref(productsData)
const currentGrid = ref(4)
const sortBy = ref('best-selling')

const getImageUrl = (name) => {
  return new URL(`../assets/productItems/${name}`, import.meta.url).href
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
    case 'low-high':
      return sorted.sort((a, b) => a.priceNumeric - b.priceNumeric)
    case 'high-low':
      return sorted.sort((a, b) => b.priceNumeric - a.priceNumeric)
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

  .lines-wrapper {
    display: flex;
    gap: 2px;
    height: 16px;
    
    .line {
      width: 4px;
      height: 100%;
      background: #ccc;
      display: inline-block;
    }
  }

  &:hover {
    border-color: #d4af37;
    .line { background: #d4af37; }
  }

  &.active {
    background: #000;
    border-color: #000;
    .line { background: #fff; }
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
    .wishlist-btn { opacity: 1; }
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1/1;
    background: #f9f9f9;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .wishlist-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s ease;

      svg {
        width: 18px;
        height: 18px;
        color: #666;
      }

      &:hover {
        background: #f0f0f0;
        svg { color: #e74c3c; fill: #e74c3c; }
      }
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
