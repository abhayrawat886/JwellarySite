<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <h1 class="hero-title">Our Heritage of Elegance</h1>
        <p class="hero-subtitle">Crafting timeless stories in gold and silver since 2000 in the heart of Surat.</p>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="about-content">
      <div class="container">
        <div class="content-grid">
          
          <!-- Column 1: Company History & Mission -->
          <div class="story-block">
            <div class="paragraph-item">
              <h2>Legacy of Excellence</h2>
              <p>Established in the year 2000, Rennu Jwellers began its journey in the diamond capital of the world—Surat. For over two decades, we have been more than just a jewellery shop; we have been custodians of tradition and pioneers of modern design. Our roots are deeply embedded in the rich cultural heritage of Gujarat, where jewellery is not just an ornament but a celebration of life’s most precious moments.</p>
            </div>

            <div class="paragraph-item">
              <h2>Our Philosophy</h2>
              <p>At Rennu Jwellers, our philosophy is simple: Purity, Perfection, and Partnership. We believe that every piece of jewellery should be a masterpiece of craftsmanship. Our mission is to provide our clients with pieces that they can pass down through generations, maintaining the same luster and emotional value as the day they were first worn.</p>
            </div>

            <div class="paragraph-item">
              <h2>Unmatched Craftsmanship</h2>
              <p>Surat is known for its world-class artisans, and we are proud to house some of the finest hands in the industry. From the initial hand-drawn sketch to the final polish, every detail is scrutinized. Our master craftsmen combine age-old techniques with modern precision technology to ensure that the intricate patterns in our gold and silver articles are nothing short of flawless.</p>
            </div>

            <div class="paragraph-item">
              <h2>A Global Standard in Silver</h2>
              <p>While we specialize in all forms of high-end jewellery, our Silver Article collection is particularly renowned. We provide premium silver idols, luxury serveware, and decorative items that are exported globally. Each silver item undergoes a rigorous quality check to ensure 92.5% purity, making us a trusted name for spiritual and home decor collections.</p>
            </div>

            <div class="paragraph-item">
              <h2>Customization Services</h2>
              <p>We understand that jewellery is deeply personal. That is why we offer a comprehensive bespoke service where our designers work directly with you to bring your vision to life. Whether it is transforming an heirloom or creating a unique engagement ring from scratch, we ensure that your signature style is reflected in every facet.</p>
            </div>
          </div>

          <!-- Column 2: Policies, Items & Ethics -->
          <div class="policy-block">
            <div class="paragraph-item">
              <h2>Transparency & Purity Policies</h2>
              <p>Trust is the cornerstone of our business. Every gold ornament at Rennu Jwellers is BIS Hallmark certified, ensuring the exact caratage promised. For our diamond collections, we provide internationally recognized grading certificates. Our transparent pricing policy means no hidden costs—what you see is what you pay, based on daily market rates.</p>
            </div>

            <div class="paragraph-item">
              <h2>Sustainability & Ethical Sourcing</h2>
              <p>We are committed to ethical practices. All our diamonds are sourced from conflict-free zones, complying with the Kimberley Process. Furthermore, we actively promote sustainable sourcing of metals and practice eco-friendly refining processes in our workshop to minimize our environmental footprint in the beautiful city of Surat.</p>
            </div>

            <div class="paragraph-item">
              <h2>Our Signature Collections</h2>
              <p>Our portfolio spans across diverse categories: Antique Temple Jewellery, Modern Diamond Solitaires, and Royal Silverware. We take immense pride in our 'Divine Collection,' which features handcrafted idols of Lord Ganesha and Goddess Durga, designed specifically for those who seek spiritual beauty in the highest quality of silver.</p>
            </div>

            <div class="paragraph-item">
              <h2>Customer Experience</h2>
              <p>Walking into our Surat showroom is an experience in itself. We strive to provide a luxurious yet comfortable environment where our consultants guide you through our collections without pressure. For our digital customers, we offer high-resolution virtual tours and secure worldwide shipping, ensuring the Rennu Jwellers experience is accessible everywhere.</p>
            </div>

            <div class="paragraph-item">
              <h2>Visit Our Showroom</h2>
              <p>Located at the heart of Surat’s diamond district, we invite you to explore our heritage in person. Visit us at 123 Jewel Street, Diamond District, Mumbai (Regional Office) or our flagship store in Surat. Our doors are always open to those who appreciate the finer things in life. Connect with us today to start your journey into the world of premium jewellery.</p>
            </div>
          </div>

        </div>

        <div class="cta-section">
          <p>Want to know more about our latest collections?</p>
          <router-link to="/" class="cta-btn">View Our Gallery</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped lang="scss">
.about-page {
  font-family: 'Outfit', sans-serif;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.about-hero {
  background: #050505;
  color: #fff;
  padding: 8rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #d4af37 0%, #ffffff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 700px;
    margin: 0 auto;
  }
}

/* Content Grid */
.about-content {
  padding: 6rem 0;
  background: #fff;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
}

.paragraph-item {
  margin-bottom: 3.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(212, 175, 55, 0.3);
    }
  }

  p {
    font-size: 1.05rem;
    color: #555;
    text-align: justify;
  }
}

/* CTA Section */
.cta-section {
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px solid #eee;
  text-align: center;

  p {
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 1.5rem;
  }

  .cta-btn {
    display: inline-block;
    background: #111;
    color: #fff;
    padding: 1rem 3rem;
    text-decoration: none;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;

    &:hover {
      background: #d4af37;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
    }
  }
}

/* Mobile Responsiveness */
@media (max-width: 968px) {
  .hero-title { font-size: 2.5rem; }
  .content-grid { grid-template-columns: 1fr; gap: 0; }
  .paragraph-item { margin-bottom: 3rem; }
}
</style>