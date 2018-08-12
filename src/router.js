import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Cart from './components/Cart/Cart.vue'
import ProductDetail from './components/Products/ProductDetail/ProductDetail.vue'
import Checkout from '@/components/Checkout/Checkout.vue'
import ThankYou from '@/components/ThankYou/ThankYou.vue'
import PageNotFound from '@/components/PageNotFound/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/products/:productID',
      name: 'productDetail',
      component: ProductDetail
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta:{
        requiresCartItems: true
      }
    },
    {
      path: '/thankyou',
      name: 'ThankYou',
      component: ThankYou
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }

  ]
  
  
})


