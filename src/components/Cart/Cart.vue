<template>
    <div>
        <p>This is the cart view</p>
        <cartItem :cartObj="this.cartItems"></cartitem>
    </div>
</template>

<script>
    import moltin from '@/moltinConfig'
    import cartItem from '@/components/Cart/CartItem/CartItem.vue'
    export default {
        name: 'Cart',
        components: {
            cartItem
        },
        data(){
            return{
                cartItems : null
            }
        },
        created(){
            moltin
                .Cart()
                .Items()
                .then( cart => {
                    return this.cartItems = cart;
                })
        }
    }
</script>

<style scoped>

</style>