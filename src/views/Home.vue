<template>
  <div class="home">
    <ProductCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/Products/Card/ProductCard'

export default {
  name: 'home',
  components: {
    ProductCard
  }
}
</script>
