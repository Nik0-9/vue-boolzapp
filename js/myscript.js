import { contacts } from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts,
            currentId: 2
        }
    },
    methods:{
        changeActiveId(id){
           return this.currentId = id;
        }
    },
    computed:{
        activeId(){
            return this.contacts.find((el)=> el.id === this.currentId);
        }
    },
    mounted(){
        console.log(this.contacts);
    }
}).mount('#app')