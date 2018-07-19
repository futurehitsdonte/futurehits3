<template>
  <div class="home">
    <ProductCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/Products/Card/ProductCard'
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {
    ProductCard
  }
}
</script>

<style >

</style>

