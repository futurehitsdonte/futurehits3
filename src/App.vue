<template>
  <v-app id="app">
    <div>
      <NavBar />
      <v-content>
        <v-container fluid>
          <router-view class="view"/>
        </v-container>
      </v-content>
    </div>
    <div v-if="loading" id="loading"></div>
  </v-app>
</template>

<script>
import NavBar from '@/components/Navbar/NavBar'
import {mapState} from 'vuex'
  export default {
    name: 'app',
    components: {
      NavBar
    },
    computed:{
      ...mapState([
        'loading'
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
</style>
