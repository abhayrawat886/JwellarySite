<template>
  <footer class="footer">
    <div class="container">
      <!-- Top Section -->
      <div class="footer-top">
        <!-- Brand / Logo -->
        <div class="footer-brand">
        <div class="logo-wrapper">
          <!-- <div class="logo-icon">
            <span class="short-name">RJ</span>
          </div> -->
          <img :src="logo4" alt="Rennu Jwellers Logo" class="custom-logo-img" />
          <div class="logo-text">
            <span class="rennu">Rennu</span>
            <span class="jwellers">Jwellers</span>
          </div>
        </div>
          <p class="brand-slogan">Exquisite Craftsmanship, Timeless Elegance.</p>
          <!-- QR Code Section -->
          <div class="qr-code-wrapper">
            <p class="qr-title">Scan for Directions</p>
            <div class="qr-image-container">
              <img :src="renuJwellAdress" alt="Store Location QR Code" class="qr-image" />
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links-grid">
          <div class="links-column">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link to="/">Dashboard</router-link></li>
              <li><router-link to="/collections">Collections</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link :to="{ path: '/collections', query: { tab: 'new-arrivals' }}">New Arrivals</router-link></li>
            </ul>
          </div>
          <div class="links-column">
            <h3>Categories</h3>
            <ul>
              <li><router-link :to="{ path: '/collections', query: { tab: 'gold' }}">Gold Jewellery</router-link></li>
              <li><router-link :to="{ path: '/collections', query: { tab: 'diamond' }}">Diamond Items</router-link></li>
              <li><router-link :to="{ path: '/collections', query: { tab: 'silver' }}">Silver Articles</router-link></li>
              <li><router-link :to="{ path: '/collections', query: { tab: 'gifting' }}">Giftings</router-link></li>
            </ul>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="footer-contact">
          <h3>Contact Us</h3>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p>Shree Rennu Jewellers U-4b, 1st floor, Regent arcade, Nr. Shiv Shakti, Ghod Dod Rd, Surat, Gujarat 395007</p>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <p>+91 7863010614 
              <br />
              +91 6395379597</p>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p>rennujewellers@gmail.com</p>
          </div>
        </div>
      </div>

      <hr class="footer-divider" />

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <div class="social-links">
          <!-- Facebook -->
          <a href="https://www.facebook.com/rennujewellers" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
            <svg viewBox="0 0 320 512" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
          </a>
          <!-- Instagram -->
          <a href="https://www.instagram.com/shreerennujewellers?igsh=MXc1emlqdXRvcWJ1ag==" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
          </a>
          <!-- YouTube -->
          <a href="https://youtube.com/@shreerennujewellers?si=vpyqovzbXq2unZ67" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
            <svg viewBox="0 0 576 512" fill="currentColor"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
          </a>
          <!-- WhatsApp -->
          <a href="https://whatsapp.com/channel/0029VaqhP9M8fewgvOf9Jr37" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp">
            <svg viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          </a>
        </div>
        <p class="copyright">© 2024 Rennu Jwellers. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import renuJwellAdress from  '../assets/images/renuJwellAdress.png';
import logo2 from '../assets/images/transparentRJL.png';
import logo4 from '../assets/images/newlogo.jpeg'

</script>

<style scoped lang="scss">
.footer {
  background: #050505;
  width: 100%;
  color: #ffffff;
  padding: 4rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Outfit', sans-serif;
}

.container {
  padding: 0 2rem;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

// Brand Styles
.footer-brand {
  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .custom-logo-img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }

  .logo-icon {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d4af37;
    border: 2px solid #d4af37;
    border-radius: 50%;
    
    .short-name {
      font-weight: 800;
      font-size: 0.85rem;
    }
  }

  .logo-text {
    display: flex;
    gap: 0.4rem;
    font-size: 1.4rem;
    font-weight: 700;
    text-transform: uppercase;
    
    .rennu { color: #d4af37; }
    .jwellers { color: #ffffff; }
  }

  .brand-slogan {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 300px;
    margin-bottom: 2rem;
  }

  .qr-code-wrapper {
    .qr-title {
      font-size: 0.9rem;
      color: #d4af37;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .qr-image-container {
      background: #ffffff;
      padding: 0.5rem;
      border-radius: 8px;
      display: inline-block;

      .qr-image {
        width: 100px;
        height: 100px;
        object-fit: contain;
        display: block;
      }
    }
  }
}

// Links Styles
.footer-links-grid {
  display: flex;
  gap: 4rem;
  
  .links-column {
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.8rem;
        
        a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;

          &:hover {
            color: #ffffff;
          }
        }
      }
    }
  }
}

// Contact Styles
.footer-contact {
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .contact-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.2rem;
    
    .contact-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: #d4af37;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.footer-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2.5rem;
}

// Bottom Section Styles
.footer-bottom {
  text-align: center;

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .social-icon {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      transition: all 0.3s ease;

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background: #d4af37;
        border-color: #d4af37;
        color: #050505;
        transform: translateY(-3px);
      }
    }
  }

  .copyright {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.85rem;
  }
}

// Responsive
@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  .footer-contact {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .footer-links-grid {
    flex-direction: column;
    gap: 2.5rem;
  }
  .footer-contact {
    grid-column: span 1;
  }
}
</style>