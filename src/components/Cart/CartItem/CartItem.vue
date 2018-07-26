<template>
    <div>
        
        <div v-if="resetCart">
            <div v-if="resetCart.data.length > 0">
                <ul>
                    
                    <li v-for="cart in resetCart.data" :key="cart.id">
                        <h3>{{cart.name}}</h3> 
                        <img :src="cart.image.href" :alt="cart.image.file_name">
                        <v-text-field v-model="cart.quantity" type="number" :items="itemQuantity"></v-text-field>
                        <DeleteItemModal :idOfItem="cart.id" :quantityOfItems="cart.quantity" :itemName="cart.name" @productItemsData="resetData($event)"/>
                    </li>
                </ul>
                <v-btn href="#/checkout">Go to Checkout</v-btn>
            </div>
            
            <div v-if="resetCart.data.length === 0">
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <img src="../../../assets/future-hits-logo-green.png" alt="" id="imgNoData">
                    </v-layout>
                </v-container>
                
            </div>
        </div>
    </div>
</template>

<script>
    import DeleteItemModal from '@/components/Cart/CartItem/modals/DeleteItemModal.vue'
    export default {
        name: "cartItem",
        props: {
            cartObj: {
                default: null
            }
        },
        components: {
            DeleteItemModal
        },
        data(){
            return{
                cartData :  null,
                cartMetaData : null,
                itemQuantity: [
                    1,2,3,4,5,6,7,8,9,10
                ]
            }
        },
        created(){

        },
        computed: {
            resetCart(){
                
                if(this.cartData){
                    return this.cartData
                }else{
                    return this.cartObj
                }
                
            }
        },
        methods: {
            resetData(val){
                this.$store.dispatch('getCartItems')
                this.cartData = val
            }
        }
    }
</script>

<style scoped>
    ul{
        list-style: none
    }
    li{
        float: left;
        width: 50%;
    }
    #imgNoData{
        width: 20%;
    }
</style>