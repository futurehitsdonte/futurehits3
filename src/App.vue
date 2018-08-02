<template>
  <v-app id="app">
    <div>
      <NavBar />
      <v-content>
        <v-container fluid class="container-padding-none" pa-0>
          <router-view class="view"/>
        </v-container>
      </v-content>
    </div>
    <v-footer class="pa-3" color="gray darken-4" dark>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
    <div v-if="getLoadingState" id="loading">
      <v-progress-linear :indeterminate="true" color="green darken-4"></v-progress-linear>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <img src="./assets/future-hits-logo-green.png" alt="" id="imgNoData">
        </v-layout>
      </v-container>
      
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/Navbar/NavBar'
import {mapState, mapGetters} from 'vuex'
  export default {
    name: 'app',
    components: {
      NavBar
    },
    computed:{
      ...mapState([
        'loading'
      ]),
      ...mapGetters([
        'getLoadingState'
      ])

    }
  }
</script>


<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#loading{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index:10;
  background: rgba(255,255,255,1);
}
#imgNoData{
        width: 20%;
        display: block;
    }
    .v-progress-linear{
      margin: 0;
    }
   
    
</style>
