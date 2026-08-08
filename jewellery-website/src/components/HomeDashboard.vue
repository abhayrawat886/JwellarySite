<template>
    <div class="home-dashboard">
       <!-- Creative Split-Layout Hero Section -->
       <div class="hero-section">
         <div class="hero-container container">
           <div class="hero-content">
             <h4 class="hero-tagline">Since 2000</h4>
             <h1 class="hero-main-title">Crafting Your <span class="highlight">Golden</span> Moments</h1>
             <p class="hero-description">Experience the legacy of artisanal excellence from the heart of Surat. Every piece is a testament to timeless beauty and unmatched purity.</p>
             <div class="hero-actions">
               <router-link to="/collections" class="btn-primary">Explore Collection</router-link>
               <router-link to="/about" class="btn-text">Discover Our Legacy &rarr;</router-link>
             </div>
           </div>
           <div class="hero-image-wrapper">
             <div class="image-mask"></div>
             <img :src="heroSectionImage" alt="Luxury Jewellery" class="hero-image" />
           </div>
         </div>
       </div>

       <ProductGrid />
    </div>
</template>

<script setup>
import ProductGrid from './productgrid.vue'

import heroSectionImage from '../assets/images/heroSectionImage.avif'
</script>

<style scoped lang="scss">
.home-dashboard {
    width: 100%;
}

.hero-section {
    background: #050505;
    min-height: 85vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 20px;

    .hero-container {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        align-items: center;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 4rem;
    }

    .hero-content {
        z-index: 5;
        animation: fadeInLeft 1s ease-out;

        .hero-tagline {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 5px;
            color: #d4af37;
            margin-bottom: 1.5rem;
            display: inline-block;
            border-bottom: 2px solid #d4af37;
            padding-bottom: 5px;
        }

        .hero-main-title {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            line-height: 1.1;
            font-weight: 700;
            color: #fff;
            margin-bottom: 2rem;
            
            .highlight {
                color: #d4af37;
                font-style: italic;
            }
        }

        .hero-description {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.8;
            max-width: 550px;
            margin-bottom: 3rem;
        }

        .hero-actions {
            display: flex;
            align-items: center;
            gap: 2.5rem;

            .btn-primary {
                background: #d4af37;
                color: #000;
                padding: 1.2rem 3rem;
                text-decoration: none;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-radius: 0;
                transition: all 0.4s ease;

                &:hover {
                    background: #fff;
                    transform: translateY(-5px);
                }
            }

            .btn-text {
                color: #fff;
                text-decoration: none;
                font-weight: 500;
                letter-spacing: 1px;
                transition: color 0.3s ease;

                &:hover {
                    color: #d4af37;
                }
            }
        }
    }

    .hero-image-wrapper {
        position: relative;
        height: 85vh;
        width: 100%;
        animation: fadeInRight 1.2s ease-out;

        .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            opacity: 0.8; // Reduced opacity as requested
        }

        .image-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, #050505 0%, transparent 40%, transparent 60%, #050505 100%);
            z-index: 2;
        }
    }
}

@keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 1024px) {
    .hero-section {
        .hero-container {
            grid-template-columns: 1fr;
            padding: 4rem 2rem;
            text-align: center;
        }

        .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .hero-description {
                margin-left: auto;
                margin-right: auto;
            }

            .hero-actions {
                justify-content: center;
            }
        }

        .hero-image-wrapper {
            display: none; // Hide actual image on tablets/mobile for layout
        }

        // Add background image to hero-section on mobile
        background-image: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop');
        background-size: cover;
        background-position: center;
    }
}

@media (max-width: 480px) {
    .hero-section .hero-actions {
        flex-direction: column;
        gap: 1.5rem;
    }
}
</style>