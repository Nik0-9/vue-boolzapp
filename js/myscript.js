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
        createMessage(msg,status){
            const newMessage = {
                date: date.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'),
                message: msg,
                status: status
            }
            // return newMessage;
            this.activeContact.messages.push(newMessage);

        },
        sendMessage(){
            this.createMessage(this.textMessage, 'sent')
            
            this.textMessage = '';
            setTimeout(()=>{
            this.createMessage('ok', 'received')
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