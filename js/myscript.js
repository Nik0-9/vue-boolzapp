import { contacts } from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts,
            currentId: 1,
            textMessage: ''
        }
    },
    methods:{
        changeActiveId(id){
           this.currentId = id;
        },
        sendMessage(){
            const newMessage = {
                date: new Date().toLocaleString(),
                message: this.textMessage,
                status: 'sent'
            }
            this.activeContact.messages.push(newMessage);
            this.textMessage = '';
        },
        // lastMessageDate(){
        //    const lastMessage = '';
        //     return lastMessage = activeContact.messages.forEach((el)=> el.message);
        //    });
    },
    computed:{
        activeContact(){
            return this.contacts.find((el)=> el.id === this.currentId);
        }
    },
    mounted(){
        console.log(this.contacts);
    }
}).mount('#app')