<template>
    <div v-if="singleProduct">
        <v-container>
            <v-layout wrap>
                <v-flex xs12 sm12 md6 lg4 elevation-6 mb-4>
                    <v-carousel light hide-delimiters>
                        <v-carousel-item
                        v-for="(item,i) in singleProductIncluded.files"
                        :key="i"
                        :src="item.link.href"
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>
                <v-flex sm12 md6 lg8 pl-5 class="right-description">
                    <h1 class="display-1 font-weight-bold mb-2 grey--text text--darken-4">{{singleProduct.name}} </h1>
                    <span class="display-1 grey--text text--darken-1">{{singleProduct.meta.display_price.without_tax.formatted}} <span v-if="!singleProduct.meta.stock.level > 0"> | Out of Stock</span></span>
                    <v-select
                        :items="itemQuantity"
                        color="green darken-4"
                        v-model="itemsModel"></v-select>
                    <!-- <v-select
                    color="green darken-4"
                    :items='singleProductIncluded.options'
                    item-text="name"
                    v-model="optionValue"></v-select> -->
                    <v-btn color="success" large block ripple class="green darken-4" @click="addProductToCart(singleProduct.id)" :disabled="!singleProduct.meta.stock.level > 0"> Add to Cart <v-icon right dark>add_shopping_cart</v-icon></v-btn>
                    <v-flex xs-12 mt-4>
                        <span class="body-2 grey--text">Description</span>
                        <v-divider mb-2></v-divider>
                        <div class="disclaimer mt-2 ">
                            <p>
                                {{singleProduct.description}}
                            </p>
                        </div>
                    </v-flex>
                    <v-flex xs-12 mt-4>
                        <span class="body-2 red--text">Disclaimer</span>
                        <v-divider mb-2 class="red"></v-divider>
                        <div class="disclaimer mt-2 ">
                            <p>
                                Please make sure you/the person who is receiving the oil(s) is not allergic before buying or applying to your body. Future Hits 3 is not responible for any reactions/episodes that you/the person receiving the oil(s) might have.
                            </p>
                        </div>
                    </v-flex>
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
                flat
                @click="snackVModel = false">
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
                optionValue: null,
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
                        console.log(products)
                        this.snackVModel = true
                        this.text = this.singleProduct.name + ' has been added to cart!';
                        this.$store.dispatch('getCartStoreLength')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style>
    .v-icon{
        color: #000;
    }
    @media only screen and (max-width: 960px) {
      .right-description{
        padding-left: 0 !important; 
      }
    } 
</style>