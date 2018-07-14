<template>
    <div>
        <section id="navbar">
            <h1>I'm a Nav Bar</h1>
            <ul>
                <router-link tag="li" to="/" exact><a>Home</a></router-link>
                <router-link tag="li" to="/cart"><a>Cart: {{cartLength}}</a></router-link>
            </ul>
        </section>
    </div>
</template>

<script>
    import {eventBus} from '../../main'
    import moltin from '@/moltinConfig'
    export default {
        name : "NavBar",
        data(){
            return {
                cartLength : null
            }
        },
        created(){
            eventBus.$on("cartLength", (item) => {
                this.cartLength = item
            })
        },
        computed: {
            
            
        }
    }
</script>

<style scoped>

</style>