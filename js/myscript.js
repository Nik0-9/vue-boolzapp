import { contacts } from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts,
            lastMessage: ''
        }
    },
    methods:{
        printLastMessage(){
            
        }
    },
    computed(){

    },
    mounted(){
        console.log(this.contacts);
    }
}).mount('#app')