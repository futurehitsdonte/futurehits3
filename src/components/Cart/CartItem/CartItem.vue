<template>
    <div>
        <ul v-if="resetCart">
            <li v-for="cart in resetCart.data" :key="cart.id">
                <h3>{{cart.name}}</h3> 
                <img :src="cart.image.href" :alt="cart.image.file_name">
                <v-select v-model="cart.quantity" :items="itemQuantity"></v-select>
                <DeleteItemModal :idOfItem="cart.id" :quantityOfItems="cart.quantity" :itemName="cart.name" @productItemsData="resetData($event)"/>
            </li>
        </ul>

        
    </div>
</template>

<script>
    import moltin from '@/moltinConfig'
    import { mapState } from 'vuex'
    import DeleteItemModal from '@/components/Cart/CartItem/modals/DeleteItemModal.vue'
    export default {
        name: "cartItem",
        props: {
            cartObj: {
                default: null,
                type: Object
            }
        },
        components: {
            DeleteItemModal
        },
        data(){
            return{
                cartData : this.cartObj,
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
                    return this.cartData = []
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

</style>