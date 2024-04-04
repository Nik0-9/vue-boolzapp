import { contacts } from "./data.js";

const date = luxon.DateTime;

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
                date: date.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'),
                message: this.textMessage,
                status: 'sent'
            }
            this.activeContact.messages.push(newMessage);
            this.textMessage = '';
            setTimeout(()=>{
                const newMessage = {
                    date: date.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'),
                    message: 'ok',
                    status: 'received'
                }
            this.activeContact.messages.push(newMessage);
            },1000);
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