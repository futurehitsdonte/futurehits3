<template>
<div>  
    <v-btn @click.stop="dialog = true" color="error" round>Remove</v-btn>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="450">
        
        <v-card>
            <v-card-title class="headline">Removing {{itemName}} from your cart...</v-card-title>
            <v-card-text>Are you sure you want to remove {{itemName}} from the cart?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click.native="dialog = false">Cancel</v-btn>
            <v-btn color="error darken-1" @click="removeItemFromCart(idOfItem, quantityOfItems)">Remove</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</div>
    
</template>

<script>
    import moltin from '@/moltinConfig'
    export default {
        name: "DeleteItemModal",
        data(){
            return{
                dialog: false
            }
        },
        props: {
            idOfItem : {
                default : null,
                type: String,
                required: true
            },
            quantityOfItems: {
                default: null,
                type: Number,
                required: true
            }
            ,
            itemName: {
                default: null,
                type: String,
                required: true
            }
        },
        methods:{
            removeItemFromCart(id, quantity){
                moltin.Cart()
                    .RemoveItem(id, quantity)
                    .then( data => {
                        this.$emit('productItemsData', data);
                        this.$store.dispatch('getCartStoreLength')
                        this.dialog = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>