<template>
    <div>
        <v-snackbar 
            v-model="showSnackBarComputed" 
            :bottom="yAxisSnackbar === 'bottom'" 
            :top="yAxisSnackbar === 'top'"
            :right="xAxisSnackbar === 'right'"
            :left="xAxisSnackbar === 'left'" 
            :multi-line="modeSnackbar === 'multi-line'" 
            :vertical="modeSnackbar === 'vertical'" 
            :timeout="timeoutSnackbar"> 
            {{textSnackbar}}
            <v-btn
                color="pink"
                flat
                @click="snackVModel = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'SnackBar',
        props:{
            yAxisSnackbar: {
                type: String,
                default: 'bottom'
            },
            xAxisSnackbar: {
                type: String,
                default: 'right'
            },
            modeSnackbar: {
                type: String,
                default: 'multi-line'
            },
            timeoutSnackbar: {
                type: Number,
                default: 4000
            },
            textSnackbar:{
                type: String,
                required: true
            },
            showSnackBar: {
                type : Boolean,
                default: true
            }
        },
        data(){
            return{
                snackVModel: true,
                snackbar: false,
                y: 'bottom',
                x: 'right',
                mode: 'multi-line',
                timeout: 4000,
                text: 'Hello, I\'m a snackbar'
            }
        },
        created(){
            
        },
        computed: {
            showSnackBarComputed(){
                this.snackVModel = this.showSnackBar
            }
        }
    }
</script>

<style scoped>

</style>