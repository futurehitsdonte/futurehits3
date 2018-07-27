<template>
        <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
            Personal Infomation
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-card color="grey lighten-3" class="mb-5 pa-4 elevation-5">
                
                <v-form v-model="step1Form">
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                v-model="firstName"
                                label="First Name"
                                :rules="nameRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                v-model="lastName"
                                label="Last Name"
                                :rules="nameRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                v-model="email"
                                label="Email"
                                :rules="emailRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                v-model="shipping_address.phone_number"
                                label="Phone Number"
                                :rules="phoneNumberRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
            <v-btn color="primary" @click="e6 = 2" :disabled="!step1Form">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">Shipping/Billing Address</v-stepper-step>

            <v-stepper-content step="2">
            <v-card color="grey lighten-3" class="mb-5 pa-4 elevation-5">
                
                <v-form v-model="step2Form">
                    <v-container>
                        <v-checkbox
                            label="Same as billing address?"
                            v-model="checkIfBillingIsShipping"
                            ></v-checkbox>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md10>
                                <v-text-field
                                v-model="shipping_address.line_2"
                                :rules="GenericRules"
                                label="Address"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-text-field
                                    v-model="shipping_address.line_1"
                                    label="APT#">
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    v-model="shipping_address.county"
                                    label="State"
                                    :rules="GenericRules"
                                    required>
                                
                                </v-text-field>
                                
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    v-model="shipping_address.city"
                                    label="City"
                                    :rules="GenericRules"
                                    required>
                                
                                </v-text-field>
                                
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    v-model="shipping_address.postcode"
                                    label="Postal Code"
                                    :rules="PostalRules"
                                    required>
                                
                                </v-text-field>
                                
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
            <v-btn color="primary" @click="e6 = 3" :disabled="!step2Form">Continue</v-btn>
            <v-btn flat @click="e6 = 1">GO BACK</v-btn>
            </v-stepper-content>

            <v-stepper-step step="3">Payment Method</v-stepper-step>
            <v-stepper-content step="3">
            <v-card class="mb-5">
                <div ref="card"></div>
            </v-card>
            <v-btn color="primary" @click="purchase()">Purchase</v-btn>
            <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper>
        
</template>

<script>
import { mapActions, mapState } from 'vuex';
let stripe = Stripe('pk_test_b4rUYNwOAyepL6J6v1v8oaMA'),
    elements = stripe.elements(),
    card = null,
    style = {
    base: {
    // Add your base input styles here. For example:
    iconColor: '#F99A52',
      color: '#32315E',
      lineHeight: '48px',
      fontWeight: 400,
      fontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", sans-serif',
      fontSize: '15px',
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
    };

    export default {
        name: 'Checkout',
        data(){
            return{
                e6: 1,
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                checkIfBillingIsShipping: true,
                step1Form: false,
                step2Form: false,
                tokenTemplate: null,
                customer: {
                    name: this.fullName,
                    email: this.email
                },
                shipping_address: {
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    company_name: "",
                    line_1: "",
                    line_2: "",
                    city: "",
                    postcode: "",
                    county: "",
                    country: "USA"
                },
                billing_address: {
                    first_name: "",
                    last_name: "",
                    company_name: "",
                    line_1: "",
                    line_2: "",
                    city: "",
                    postcode: "",
                    county: "",
                    country: ""
                },
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 2) || 'Name must be greater than 2 characters'
                ],
                phoneNumberRules: [
                    v => !!v || 'Phone Number is required',
                    v => (v && v.length >= 10) || 'Phone Number must include area code.'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                GenericRules: [
                    v => !!v || 'Address is required',
                    v => (v && v.length >= 2)  || 'Address must be valid'
                ],
                PostalRules:[
                    v => !!v || 'Postal Code is required',
                    v => (v && v.length === 5)  || 'Postal Code must be valid'
                ]
                
            }
        },
        mounted(){
            
            if(card == null){
                console.log(card)
                card = elements.create('card', {style});
            }
            card.mount(this.$refs.card);
            
        },
        beforeDestroy(){
            card.unmount();
        },
        methods:{
            
            purchase(){
                let concatUserInfo = {}
                this.customer = {
                    email: this.email,
                    name: this.fullName
                }
                concatUserInfo = {
                    customer: this.customer,
                    address: this.shipping_address
                }
                this.shipping_address.first_name = this.firstName
                this.shipping_address.last_name = this.lastName
                stripe.createToken(card).then( result => {
                    let userCheckout;
                    this.tokenTemplate = {
                        gateway: 'stripe',
                        method: 'purchase',
                        payment: result.token.id
                    }
                    
                    this.$store.dispatch('checkoutCustomer', concatUserInfo).then(() => {
                        setTimeout( () => {
                            userCheckout = {
                                tokenTemplate: this.tokenTemplate,
                                orderId: this.customerPurchaseInfo.id
                            }
                            this.$store.dispatch('payForOrder', userCheckout).then(() => {
                                this.$store.dispatch('getCartStoreLength')
                            });
                        },1000)
                        
                    })
                        
                        
                });
                
                
            }
        },
        created(){
            this.$store.dispatch('getCartItems')
            this.$store.dispatch('getCartStoreLength')
        },
        computed:{
            ...mapActions([
                'payForOrder',
                'checkoutCustomer'
            ]),
            ...mapState([
                'customerPurchaseInfo'
            ]),
            fullName(){
                return `${this.firstName} ${this.lastName}`;
            }
        }
    }
</script>

<style scoped>
    .v-stepper--vertical{
        width: 100%;
    }
</style>