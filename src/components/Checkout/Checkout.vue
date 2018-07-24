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
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                v-model="firstName"
                                label="First Name"
                                :rules="nameRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                v-model="lastName"
                                label="Last Name"
                                :rules="nameRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                v-model="email"
                                label="Email"
                                :rules="emailRules"
                                required>
                                
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
            <v-btn color="primary" @click="e6 = 2" :disabled="!step1Form">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">Shipping Address</v-stepper-step>

            <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn flat @click="e6 = 1">GO BACK</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">Payment Method</v-stepper-step>

            <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">Review Your Order</v-stepper-step>
            <v-stepper-content step="4">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper>
</template>

<script>
    export default {
        name: 'Checkout',
        data(){
            return{
                e6: 1,
                firstName: null,
                lastName: null,
                email: null,
                step1Form: false,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 2) || 'Name must be greater than 2 characters'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ]
            }
        },
        created(){
            this.$store.dispatch('getCartItems')
        }
    }
</script>

<style scoped>
    .v-stepper--vertical{
        width: 100%;
    }
</style>