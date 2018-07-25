<template>
    <div>
        <cartItem :cartObj="cartItems"></cartitem>
    </div>
</template>

<script>
    import moltin from '@/moltinConfig'
    import cartItem from '@/components/Cart/CartItem/CartItem.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'Cart',
        components: {
            cartItem
        },
        data(){
            return{
                cartItemData : null
            }
        },
        created(){
            this.$store.dispatch('getCartItems')
            this.$store.dispatch('getCartStoreLength')
            moltin
                .Cart()
                .Items()
                .then( cart => {
                    return this.cartItemData = cart;
                })
        },
        computed: {
            ...mapState([
                'cartItems'
            ])
        }
    }
</script>

<style scoped>

</style>