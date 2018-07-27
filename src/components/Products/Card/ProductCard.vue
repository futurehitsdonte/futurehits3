<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm4 md3 lg2 
                v-for="(product, key) in productsCardMeta" 
                :key="key" 
                class="productCard elevation-2 ma-0" 
                @click="goToProduct(product.id)"
                v-if="product.meta.stock.level > 0 && product.relationships.collections.data[0].id === productsCardImage.collections[0].id && product.status !== 'draft'">
                
            <v-card hover>
                <v-card-media
                    :src="productsCardImage.main_images[key].link.href"
                    height="200px"
                    ></v-card-media>
                <v-card-title primary-title class="grey lighten-4">
                    <div class="width100 ">
                        <h3 class="headline text-xs-left font-weight-bold black---text">{{product.name}}</h3>
                        <p class="body-2 text-xs-left grey--text">{{ product.meta.display_price.without_tax.formatted }}</p>
                    </div>
                </v-card-title>
            </v-card>     
            </v-flex> 
        </v-layout>

        <v-layout row wrap class="mt-3">
            <v-flex xs12 sm4 md3 lg2 
                v-for="(product, key) in productsCardMeta" 
                :key="key" 
                class="productCard elevation-2 ma-0" 
                @click="goToProduct(product.id)"
                v-if="product.meta.stock.level > 0 && product.relationships.collections.data[0].id === productsCardImage.collections[1].id && product.status !== 'draft'">
            <v-card hover>
                <v-card-media
                    :src="productsCardImage.main_images[key].link.href"
                    height="200px"
                    ></v-card-media>
                <v-card-title primary-title class="grey lighten-4">
                    <div class="width100 ">
                        <h3 class="headline text-xs-left font-weight-bold black---text">{{product.name}}</h3>
                        <p class="body-2 text-xs-left grey--text">{{ product.meta.display_price.without_tax.formatted }}</p>
                    </div>
                </v-card-title>
            </v-card>     
            </v-flex> 
        </v-layout>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name : "ProductCard",
        data(){
            return {
                productsMeta: null,
                productsImage: null
            }
        },
        methods: {
            goToProduct(id){
                this.$store.state.productID = id;
                this.$router.push({name: 'productDetail', params: {productID: this.$store.state.productID}})
            }
        },
        created(){
            this.$store.dispatch('getProductData')
            this.$store.dispatch('getCartStoreLength')
        },
        computed: {
            ...mapState([
                'productsCardMeta',
                'productsCardImage',
                'cartItems',
                'loading'
            ])
        }
    }
</script>

<style scoped>
    .width100{
        width: 100%;
    }
    p{
        margin-bottom: 0 !important;
    }
</style>