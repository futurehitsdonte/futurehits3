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
    <div v-if="getLoadingState" id="loading">
      <v-progress-circular
      :size="200"
      color="primary"
      indeterminate
    ></v-progress-circular>
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
</style>
