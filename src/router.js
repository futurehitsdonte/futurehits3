import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Cart from './components/Cart/Cart.vue'
import ProductDetail from './components/Products/ProductDetail/ProductDetail.vue'
import Products from './components/Products/Products.vue'

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
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/productDetail/:productID',
      name: 'productDetail',
      component: ProductDetail
    }

  ]
})
