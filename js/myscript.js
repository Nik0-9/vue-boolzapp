import { contacts } from "./data.js";
import Picker from "./emoji-picker.js";

const date = luxon.DateTime;

const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts,
            currentId: 1,
            textMessage: '',
            searchText: '',
            dropdownChat: null,
            showEmoji: false,
            isDark: false,
            dropdownContact: false,
        }
    },
    methods: {
        changeActiveContact(id) {
            this.currentId = id;
            this.dropdownChat = -1;
        },
        createMessage(msg, status) {
            const newMessage = {
                date: date.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                message: msg,
                status: status
            }
            this.$nextTick(()=>{
                this.$refs.messages[this.$refs.messages.length - 1].scrollIntoView({behavior: 'smooth'});
            });
            return newMessage;
        },
        sendMessage() {
           const msg = this.createMessage(this.textMessage, 'sent');
            if(this.textMessage.trim() === ''){
                return;
            }
            this.activeContact.messages.push(msg);
            
            this.textMessage = '';
            setTimeout(() => {
                this.activeContact.messages.push(this.createMessage('ok', 'received'));
            }, 1000);
        },
        toggleDropdownChat(index){
            if( this.dropdownChat != index){
                this.dropdownChat = index;
            }else{
                this.dropdownChat = null;
            }
        },
        deleteMessage(index){
            this.activeContact.messages.splice(index, 1);
            this.toggleDropdownChat(index);
        },
        getContactMessage(id){
            const index = this.contacts.findIndex((el)=> el.id === id);
            const messageLastIndex = this.contacts[index].messages.length - 1;
            if(messageLastIndex >= 0){
                return this.contacts[index].messages[messageLastIndex];
            }else {
                return '';
            }
        },
        getLastMessage(id){
            if(this.getContactMessage(id)){
                return this.getContactMessage(id).message;
            }else{
                return 'non ci sono messaggi';
            }
        },
        getLastDate(id){
            if(this.getContactMessage(id)){
                return this.getContactMessage(id).date;
            }else{
                return '';
            }
        },
        toggleDark(){
            this.isDark = !this.isDark;
            console.log(this.isDark);
        },
        toggleDropdownContact(){
            this.dropdownContact = !this.dropdownContact;
            console.log(this.dropdownContact);
        },
        onSelectEmoji(emoji) {
            console.log(emoji)
            this.textMessage += emoji.i;
            /*
              // result
              { 
                  i: "😚", 
                  n: ["kissing face"], 
                  r: "1f61a", // with skin tone
                  t: "neutral", // skin tone
                  u: "1f61a" // without tone
              }
              */
        },
        deleteContactMessages(){
            this.activeContact.messages = [];
        },
        deleteContact(){
            const contactIndex = this.contacts.findIndex((contact)=> contact.id === this.currentId);
            this.contacts.splice(contactIndex, 1);
            this.currentId = this.currentId + 1;
            this.dropdownContact = false;
        },
    },
    computed: {
        activeContact() {
            return this.contacts.find((el) => el.id === this.currentId);
        },
        contactsFiltered() {
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        lastAccess(){
            const index = this.activeContact.messages.length - 1;
            if(index >= 0 && this.activeContact.messages[index].status !== 'sent'){
                return this.activeContact.messages[index].date;
            }else {
                return ''
            }
        },
    },
    mounted() {
      
    }
}).component('Picker', Picker).mount('#app')