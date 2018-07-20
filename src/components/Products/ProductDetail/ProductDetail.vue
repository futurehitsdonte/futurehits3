<template>
    <div>
        <h2 v-if="singleProduct">{{singleProduct.name}}</h2>
        <v-select
            :items="itemQuantity"
            v-model="itemsModel"></v-select>
        <v-btn color="success" @click="addProductToCart(singleProduct.id)"> Add to Cart</v-btn>
        <!-- <SnackBar :textSnackbar='snackBarText' :showSnackBar='showSnackBarBoolean'/> -->
        <v-snackbar 
            v-model="snackVModel" 
            :bottom="y"
            :right="x"
            :multi-line="mode === 'multi-line'" 
            :timeout="timeout"
            color="green"> 
            {{text}}
            <v-btn
                dark
                @click="snackVModel = false"
            >
                Close
            </v-btn>
        </v-snackbar>
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
                snackBarText: 'Change this',
                snackVModel: false,
                snackbar: false,
                y: 'bottom',
                x: 'right',
                mode: 'multi-line',
                timeout: 4000,
                text: 'Hello, I\'m a snackbar'
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
                        this.snackVModel = true
                        this.text = this.singleProduct.name + ' has been added to cart!';
                        this.$store.dispatch('getCartItems')
                    })
            }
        }
    }
</script>

<style scoped>

</style>