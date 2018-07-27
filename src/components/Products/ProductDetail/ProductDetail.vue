<template>
    <div v-if="singleProduct">
        <v-container>
            <h1 class="display-2 font-weight-regular text-xs-center mb-4 black--text">{{singleProduct.name}} <span class=" font-italic">{{singleProduct.meta.display_price.without_tax.formatted}} <span v-if="!singleProduct.meta.stock.level > 0"> | Out of Stock</span></span></h1>
            <v-layout wrap>
                
                <v-flex xs12 sm12 md6 lg6 elevation-6 mb-4>
                    <v-carousel light>
                        <v-carousel-item
                        v-for="(item,i) in singleProductIncluded.files"
                        :key="i"
                        :src="item.link.href"
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>
                <v-flex sm12 md6 lg6 pl-4>
                    <h3 class="display-1 font-weight-light font-italic red--text"> </h3>
                    <v-select
                        :items="itemQuantity"
                        color="green darken-4"
                        v-model="itemsModel"></v-select>
                    <v-btn color="success" large block ripple class="green darken-4" @click="addProductToCart(singleProduct.id)" :disabled="!singleProduct.meta.stock.level > 0"> Add to Cart</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        
        
        

        <!-- <SnackBar :textSnackbar='snackBarText' :showSnackBar='showSnackBarBoolean'/> -->
        <v-snackbar 
            v-model="snackVModel" 
            :bottom="y"
            :right="x"
            :multi-line="mode === 'multi-line'" 
            :timeout="timeout"
            color="green darken-4"> 
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
            this.$store.dispatch('getCartStoreLength')
            this.$store.dispatch('getSingleProduct', this.$route.params.productID)
            this.$store.state.productID = this.$route.params.productID,
            this.singleProductData = this.singleProduct;
            setTimeout(() => {
                console.log(this.singleProduct)
            },100)
            

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
                        this.$store.dispatch('getCartStoreLength')
                    })
            }
        }
    }
</script>

<style scoped>
    .v-icon{
        color: #000;
    }
</style>