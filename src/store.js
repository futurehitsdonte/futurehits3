import Vue from 'vue'
import Vuex from 'vuex'
import moltin from './moltinConfig'
import {eventBus} from './main'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    productID : null,
    productsCardMeta: null,
    productsCardImage: null,
    cartItems: null,
    singleProduct: null,
    singleProductIncluded: null,
    successfulTransAction: false,
    loading: true,
    customerPurchaseInfo: null
  },
  getters :{
    getProductRouteID : state => {
      return state.productID
    },
    getLoadingState : state => {
      return state.loading
    }
  },
  mutations: {
    IS_VIEW_LOADING: (state, payload) =>{
      state.loading = payload
    },
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
    },
    GET_CART_STORE_LENGTH : (state, payload) => {
      state.loading = payload
    },
    CUSTOMER_PURCHASE_INFO : (state, payload) => {
      state.customerPurchaseInfo = payload
    },
    SUCCESSFUL_PAYMENT : (state, payload) => {
      state.successfulTransAction = payload
    }
  },
  actions: {
    getProductData ({commit}){
      commit('IS_VIEW_LOADING', true)
      moltin.Products
        .With(['main_image','collections'])
        .All()
        .then( products => {
          console.log(products)
            commit('IS_VIEW_LOADING', false)
            commit('GET_PRODUCT_CARDS_META', products.data)
            commit('GET_PRODUCT_CARDS_IMAGE', products.included)
        })
        .catch( err => {
          console.log(err)
        })
    },
    getCartItems ({commit}){
      commit('IS_VIEW_LOADING', true)
      moltin.Cart()
        .Items()
        .then(cart => {
          commit('IS_VIEW_LOADING', false)
          commit('GET_CART_ITEMS', cart)
        })
    },
    getCartStoreLength (){
      moltin.Cart()
        .Items()
        .then(cart => {
            const cartQuantityArray = [];
            cart.data.forEach(element => {
                cartQuantityArray.push(element.quantity);
            })
            eventBus.$emit('cartLength', cartQuantityArray.reduce((a, b) => a + b, 0))
        })
    },
    getSingleProduct ({commit}, payload){
      commit('IS_VIEW_LOADING', true)
      moltin
            .Products
            .With(['files','variations'])
            .Get(payload)
            .then(product => {
                commit('IS_VIEW_LOADING', false)
                commit('GET_SINGLE_PRODUCT_INCLUDED', product.included)
                commit('GET_SINGLE_PRODUCT', product.data)
            })
    },
    checkoutCustomer({commit}, payload){
      commit('IS_VIEW_LOADING', true)
      moltin.Cart()
        .Checkout(payload.customer, payload.address)
        .then( results =>{
          commit('IS_VIEW_LOADING', false)
          commit('CUSTOMER_PURCHASE_INFO', results.data)
        })
    },
    payForOrder({commit},payload){
      
      moltin.Orders
        .Payment(payload.orderId, payload.tokenTemplate)
          .then(() => {
            // Do something
            commit('SUCCESSFUL_PAYMENT', true)
            moltin
            .Cart()
            .Delete()
            .then( () => {
              alert('cart deleted')
            })
          })
          .catch(() => {
            commit('SUCCESSFUL_PAYMENT', false)
          })
    }
  }
})
