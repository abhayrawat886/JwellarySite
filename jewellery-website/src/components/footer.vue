<template>
  <footer class="footer">
    <div class="container">
      <!-- Top Section -->
      <div class="footer-top">
        <!-- Brand / Logo -->
        <div class="footer-brand">
          <div class="logo-wrapper">
            <div class="logo-icon">
              <span class="short-name">RJ</span>
            </div>
            <div class="logo-text">
              <span class="rennu">Rennu</span>
              <span class="jwellers">Jwellers</span>
            </div>
          </div>
          <p class="brand-slogan">Exquisite Craftsmanship, Timeless Elegance.</p>
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
            <p>123 Jewel Street, Diamond District, Mumbai, India</p>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <p>+91 98765 43210</p>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p>info@rennujwellers.com</p>
          </div>
        </div>
      </div>

      <hr class="footer-divider" />

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <div class="social-links">
          <!-- Facebook -->
          <a href="#" class="social-icon" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <!-- Instagram -->
          <a href="#" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <!-- Threads (simplified placeholder) -->
          <a href="#" class="social-icon" aria-label="Threads">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M12 7v1"></path><path d="M12 16v1"></path></svg>
          </a>
          <!-- YouTube -->
          <a href="#" class="social-icon" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
          <!-- WhatsApp -->
          <a href="#" class="social-icon" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.2h.1A8.38 8.38 0 0 1 21 11.5z"></path></svg>
          </a>
        </div>
        <p class="copyright">© 2024 Rennu Jwellers. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import renuJwellAdress from  '../assets/images/renuJwellAdress.png';
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