<template>
    <div>
        
        <div v-if="resetCart">
            <div v-if="resetCart.data.length > 0">
                <v-data-table
                    :headers="headers"
                    :items="resetCart.data"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    
                        <td class="text-xs-left"><img :src="props.item.image.href" :alt="props.item.image.file_name"></td>
                        <td class="text-xs-left"> {{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.meta.display_price.with_tax.unit.formatted }}</td>
                        <td class="text-xs-left">{{ props.item.quantity }}</td>
                        <td class="text-xs-left"><DeleteItemModal :idOfItem="props.item.id" :quantityOfItems="props.item.quantity" :itemName="props.item.name" @productItemsData="resetData($event)"/></td>
                    </template>
                    <template slot="footer">
                        <td colspan="100%"  class="text-xs-right">
                            <strong class="headline font-weight-medium">Sub Total: {{resetCart.meta.display_price.with_tax.formatted}}</strong>
                        </td>
                    </template>
                </v-data-table>
                <v-layout justify-end>
                    <v-btn href="#/" outline large color="success">Contine Shopping</v-btn>
                    <v-btn href="#/checkout" large color="green darken-4" dark>Go to Checkout <v-icon right dark>arrow_right_alt</v-icon></v-btn>
                </v-layout>
                
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
                ],
                headers:[
                    { text: 'Product', value: 'product' },
                    { text: 'Name', value: 'name' },
                    { text: 'Price', value: 'price' },
                    { text: 'Quantity', value: 'quantity' },
                    { text: '', value: 'remove' }
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
    img{
        width: 10%;
    }
</style>