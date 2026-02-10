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
            <div class="enquiry-dropdown-container" v-click-outside="closeEnquiry">
              <button class="enquiry-btn" @click.stop="toggleEnquiry">
                Enquiry Now
                <svg :class="{ 'rotated': showEnquiry }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <div class="enquiry-menu" :class="{ 'show': showEnquiry }">
                <a :href="whatsappLink" target="_blank" class="enquiry-item" @click="closeEnquiry">
                  <div class="item-icon whatsapp">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div class="item-text">
                    <span class="label">WhatsApp Enquiry</span>
                  </div>
                </a>

                <a :href="formLink" target="_blank" class="enquiry-item" @click="closeEnquiry">
                  <div class="item-icon form">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <div class="item-text">
                    <span class="label">Google Form Enquiry</span>
                  </div>
                </a>

                <div class="enquiry-item" @click="openEmailModal">
                  <div class="item-icon email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div class="item-text">
                    <span class="label">Email Enquiry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form Modal -->
          <ContactFormModal 
            :isOpen="isEmailModalOpen" 
            :productName="product?.name"
            :initialSubject="`Enquiry for ${product?.name}`"
            @close="isEmailModalOpen = false"
          />

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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import productsData from '../../assets/products.json'
import ContactFormModal from '../../components/ContactFormModal.vue'

const route = useRoute()
const product = ref(null)
const phoneNumber = '918193979086'
const showEnquiry = ref(false)
const isEmailModalOpen = ref(false)

const getImageUrl = (name) => {
  return new URL(`../../assets/productItems/${name}`, import.meta.url).href
}

const toggleEnquiry = () => {
  showEnquiry.value = !showEnquiry.value
}

const closeEnquiry = () => {
  showEnquiry.value = false
}

const openEmailModal = () => {
  isEmailModalOpen.value = true
  closeEnquiry()
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

// Redirect Links
const whatsappLink = computed(() => {
  const message = `Hi, I am interested in your ${product.value?.name}. Can you provide more details?`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})

const formLink = 'https://docs.google.com/forms/d/YOUR_FORM_ID/viewform'

onMounted(() => {
  const productId = parseInt(route.params.id)
  product.value = productsData.find(p => p.id === productId)
  
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

  .enquiry-dropdown-container {
    position: relative;
    display: inline-block;
  }

  .enquiry-btn {
    appearance: none;
    -webkit-appearance: none;
    background: #000;
    color: #fff;
    padding: 1.2rem 3rem;
    border: 1px solid #000;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
    font-size: 1rem;
    border-radius: 50px;

    svg {
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
      &.rotated { transform: rotate(180deg); }
    }

    &:hover {
      background: #333;
      transform: translateY(-2px);
    }
  }

  .enquiry-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    width: 240px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 100;
    cursor: pointer;

    &.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  .enquiry-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.2s ease;
    margin-bottom: 0.15rem;

    &:last-child { margin-bottom: 0; }

    .item-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      
      svg { width: 16px; height: 16px; }

      &.whatsapp { background: #e8f5e9; color: #25d366; }
      &.form { background: #fff8e1; color: #ffc107; }
      &.email { background: #e3f2fd; color: #2196f3; }
    }

    .item-text {
      .label {
        display: block;
        color: #111;
        font-weight: 600;
        font-size: 0.85rem;
      }
      .sub-label {
        display: none; // Hidden for smaller design
      }
    }

    &:hover {
      background: #f7f7f7;
      .item-text .label { color: #d4af37; }
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

  .enquiry-menu {
    width: 280px;
  }
}

@media (max-width: 480px) {
  .enquiry-btn {
    width: 100%;
    justify-content: center;
  }
  .enquiry-menu {
    width: 100%;
  }
}
</style>
