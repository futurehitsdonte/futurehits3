<template>
    <div>
        <code>
            {{singleProduct}}
        </code>
        <code>
            {{singleProductIncluded}}
        </code>
    </div>
</template>

<script>
    import moltin from '@/moltinConfig'
    import {eventBus} from '../../../main'
    import { mapState } from 'vuex'
    export default {
        name: "ProductDetail",
        data(){
            return{
                singleProductData: null
            }
        },
        created(){
            this.$store.dispatch('getCartItems')
            this.$store.dispatch('getSingleProduct', this.$route.params.productID)
            this.$store.state.productID = this.$route.params.productID
        },
        computed: {
            ...mapState([
                'cartItems',
                'singleProduct',
                'singleProductIncluded'
            ])
        }
    }
</script>

<style scoped>

</style>