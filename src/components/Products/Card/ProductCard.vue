<template>
    <div>
        <ul class="productUL">
            <li v-for="(product, key) in productsCardMeta" :key="key" class="productCard" @click="goToProduct(product.id)">
                <p>{{ product.name }}</p>
                <img :src="productsCardImage[key].link.href" />
            </li>
        </ul>
        <div v-if="loading">
            {{productsCardMeta}}
        </div>
    </div>
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
            setTimeout(()=> {
                this.$store.dispatch('getProductData')
                this.$store.dispatch('getCartItems')
            }, 2000)
            
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
    .productUL{
        list-style: none;
    }
    .productCard{
        border: 1px solid #eee;
        width: 33.33%;
        padding: 10px;
        float: left;
    }
    .productCard > p{
        text-align: center;
    }
    .productCard > img{
        display: block;
        margin: 0 auto;
        width: 41%;
    }
    input[type="number"]{
        width: 40%;
        border: 2px solid #eee;
        margin-bottom: 10px;
    }
</style>