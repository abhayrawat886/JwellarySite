<template>
    <div class="home-dashboard">
       <img class="homeImage" :src="silverAritcal" alt="">
       <ProductGrid />
    </div>
</template>

<script setup>
import silverAritcal from '../assets/images/silverAritcal.webp'
import ProductGrid from './ProductGrid.vue'
</script>

<style scoped lang="scss">
.home-dashboard{
    width: 100%;
    margin-top: 20px;
}
.homeImage{
    width: 100%;
    height: 100%;
}
</style>