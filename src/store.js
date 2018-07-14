import Vue from 'vue'
import Vuex from 'vuex'
import moltin from './moltinConfig'
import {eventBus} from './main'
import router from './router'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    productID : null,
    productsCardMeta: null,
    productsCardImage: null,
    cartItems: null,
    singleProduct: null,
    singleProductIncluded: null
  },
  getters :{
    getProductRouteID : state => {
      return state.productID
    }
  },
  mutations: {
    GET_CART_LENGTH: (state, payload) =>{
      state.cartLength = payload
    },
    GET_PRODUCT_CARDS_META : (state, payload) =>{
      state.productsCardMeta = payload
    },
    GET_PRODUCT_CARDS_IMAGE: (state, payload) =>{
      state.productsCardImage = payload
    },
    GET_CART_ITEMS: (state, payload) =>{
      state.cartItems = payload
    },
    GET_SINGLE_PRODUCT : (state, payload) => {
      state.singleProduct = payload
    },
    GET_SINGLE_PRODUCT_INCLUDED : (state, payload) => {
      state.singleProductIncluded = payload
    }
  },
  actions: {
    getProductData ({commit}){
      console.log(router)
      moltin.Products
        .With('main_image')
        .All()
        .then( products => {
            commit('GET_PRODUCT_CARDS_META', products.data)
            commit('GET_PRODUCT_CARDS_IMAGE', products.included.main_images)
        })
    },
    getCartItems ({commit}){
      moltin.Cart()
        .Items()
        .then(cart => {
            const cartQuantityArray = [];
            cart.data.forEach(element => {
                cartQuantityArray.push(element.quantity);
            })
            commit('GET_CART_ITEMS', cart.data)
            eventBus.$emit('cartLength', cartQuantityArray.reduce((a, b) => a + b, 0))
        })
    },
    getSingleProduct ({commit}, payload){
      moltin
            .Products
            .With(['main_image', 'files'])
            .Get(payload)
            .then(product => {
                console.log(product)
                commit('GET_SINGLE_PRODUCT_INCLUDED', product.included)
                commit('GET_SINGLE_PRODUCT', product.data)
            })
    }
  }
})
