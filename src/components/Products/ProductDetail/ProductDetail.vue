<template>
    <div>
        <h2 v-if="singleProduct">{{singleProduct.name}}</h2>
        <v-select
            :items="itemQuantity"
            v-model="itemsModel"></v-select>
        <v-btn color="success" @click="addProductToCart(singleProduct.id)"> Add to Cart</v-btn>
        <SnackBar :textSnackbar='snackBarText' :showSnackBar='showSnackBarBoolean'/>
    </div>
</template>

<script>
    import moltin from '@/moltinConfig'
    import {eventBus} from '@/main'
    import { mapState } from 'vuex'
    import SnackBar from '@/components/SnackBar/SnackBar.vue'
    export default {
        name: "ProductDetail",
        components:{
            SnackBar
        },
        data(){
            return{
                singleProductData: null,
                itemsModel: 1,
                itemQuantity: [
                    1,2,3,4,5,6,7,8,9,10
                ],
                snackBarText: 'hello my friends',
                showSnackBarBoolean: true
            }
        },
        created(){
            this.$store.dispatch('getCartItems')
            this.$store.dispatch('getSingleProduct', this.$route.params.productID)
            this.$store.state.productID = this.$route.params.productID,
            this.singleProductData = this.singleProduct;
        },
        computed: {
            ...mapState([
                'singleProduct',
                'singleProductIncluded'
            ])

        },
        methods:{
            addProductToCart(item){
                moltin.Cart()
                    .AddProduct(item, this.itemsModel)
                    .then( (products) => {
                        this.$store.dispatch('getCartItems')
                    })
            }
        }
    }
</script>

<style scoped>

</style>