<template>
    <div>
        <v-navigation-drawer  app disable-resize-watcher temporary v-model="drawer" :clipped="clipped">
            <v-toolbar flat>
                <v-list>
                    <v-list-tile>
                    <v-list-tile-title class="title">
                        Application
                    </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
        </v-navigation-drawer>
        <v-toolbar app fixed :clipped-left="clipped" class="green darken-4 white--text">
            <v-toolbar-side-icon @click.stop="drawer =! drawer" class="hidden-sm-and-up white--text"></v-toolbar-side-icon>
            <v-toolbar-title>Future Hits 3</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down ">
                <v-btn flat ripple exact href="#/" class="white--text">Home</v-btn>
                <v-btn flat ripple href="#/cart" class="white--text">
                    <v-badge overlap color="red darken-4">
                    <span slot="badge">{{cartLength || 0}}</span>
                    <v-avatar
                    >
                        <v-icon>shopping_cart</v-icon>
                    </v-avatar>
                    </v-badge>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        
    </div>
</template>

<script>
    import {eventBus} from '../../main'
    export default {
        name : "NavBar",
        data(){
            return {
                cartLength : null,
                drawer: false,
                clipped: true
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

<style>
    .v-badge--overlap .v-badge__badge{
        top: -3px;
        right: -6px;
    }
</style>