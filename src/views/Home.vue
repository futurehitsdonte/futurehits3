<template>
  <div class="home">
    <div class="jumbotron">
      <v-jumbotron color="green darken-3" dark >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">Welcome to Future Hits 3</h3>

              <v-divider class="my-3"></v-divider>

              <div class="body-2 mb-3">Established in Newport News, VA.</div>

              <!-- <v-btn
                class="mx-0"
                color="grey darken-3"
                large
              >
                See more
              </v-btn> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </div>
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

<style >
</style>

