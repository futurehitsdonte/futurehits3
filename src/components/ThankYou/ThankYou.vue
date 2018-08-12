<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex pt-3 pb-3 style="text-align: center">
                    <h1 class="text-xs-center display-3">Thank You for your support!</h1>
                    <p class="text-xs-center headline">Your product(s) should be arriving shortly.</p>
                    <v-btn
                        class="text-xs-center mb-4"
                        color="green darken-3"
                        dark
                        large
                        href="#/"
                    >
                        GO HOME
                    </v-btn>
                    <img src="../../assets/future-hits-emblem.png" alt="FH emblem">

                    
                </v-flex>
            
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'thankYou'
    }
</script>

<style scoped>
    img{
        display: block;
        margin: 0 auto;
        max-width: 80%;
    }
</style>