<template>
  <div v-if="product" class="product-detail-page">
    <div class="container">
      <div class="detail-grid">
        <!-- Left Side: Image -->
        <div class="image-section">
          <div class="image-container">
            <img 
              :src="getImageUrl(product.image)" 
              :alt="product.name" 
              class="main-image"
            />
          </div>
        </div>

        <!-- Right Side: Content -->
        <div class="content-section">
          <nav class="breadcrumb">
            <router-link to="/">Home</router-link> / <span>{{ product.category }}</span>
          </nav>
          
          <h1 class="title">{{ product.name }}</h1>
          <p class="price">{{ product.price }}</p>
          
          <div class="description-box">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="actions">
            <a :href="`tel:${phoneNumber}`" class="enquiry-btn">
              Enquiry Now
            </a>
          </div>

          <div class="features">
            <div class="feature-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>Authentic Certificate</span>
            </div>
            <div class="feature-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Insured Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading product...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import productsData from '../../assets/products.json'

const route = useRoute()
const product = ref(null)
const phoneNumber = '918193979086'

const getImageUrl = (name) => {
  return new URL(`../../assets/productItems/${name}`, import.meta.url).href
}

onMounted(() => {
  const productId = parseInt(route.params.id)
  product.value = productsData.find(p => p.id === productId)
  
  // Ensure the page starts at the top when navigating
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<style scoped lang="scss">
.product-detail-page {
  padding: 4rem 0;
  background: #fff;
  min-height: 80vh;
  font-family: 'Outfit', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Image Styles */
.image-section {
  position: sticky;
  top: 120px;
}

.image-container {
  width: 100%;
  aspect-ratio: 1/1;
  background: #f9f9f9;
  border: 1px solid #f0f0f0;
  overflow: hidden;

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

/* Content Styles */
.content-section {
  .breadcrumb {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1.5rem;
    
    a { color: #888; text-decoration: none; &:hover { color: #d4af37; } }
    span { color: #d4af37; font-weight: 500; }
  }

  .title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #111;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 1.8rem;
    font-weight: 700;
    color: #d4af37;
    margin-bottom: 2rem;
  }

  .description-box {
    margin-bottom: 2.5rem;
    
    h3 {
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
      color: #777;
    }

    p {
      color: #555;
      line-height: 1.8;
      font-size: 1.05rem;
    }
  }

  .enquiry-btn {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 1.2rem 3rem;
    text-decoration: none;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 1px solid #000;

    &:hover {
      background: #d4af37;
      border-color: #d4af37;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
    }
  }

  .features {
    margin-top: 3rem;
    display: flex;
    gap: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #666;
      font-size: 0.9rem;

      svg { width: 24px; height: 24px; color: #d4af37; }
    }
  }
}

@media (max-width: 968px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .image-section {
    position: static;
  }
}
</style>
