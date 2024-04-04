import { contacts } from "./data.js";

const date = luxon.DateTime;

const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts,
            currentId: 1,
            textMessage: '',
            searchText: '',
            dropdownOpen: -1,
        }
    },
    methods: {
        changeActiveContact(id) {
            this.currentId = id;
            this.dropdownOpen = -1;
        },
        createMessage(msg, status) {
            const newMessage = {
                date: date.now().setLocale('it').toFormat('HH:mm:ss'),
                message: msg,
                status: status
            }
            return newMessage;
        },
        sendMessage() {
           const msg = this.createMessage(this.textMessage, 'sent');
            if(this.textMessage.trim() === ''){
                return
            }
            this.activeContact.messages.push(msg);
            this.textMessage = '';
            setTimeout(() => {
                this.activeContact.messages.push(this.createMessage('ok', 'received'));
            }, 1000);
        },
        toggleDropdown(index){
            if( this.dropdownOpen != index){
                this.dropdownOpen = index;
            }else{
                this.dropdownOpen = -1;
            }
        },
        deleteMessage(index,){
            this.activeContact.messages.splice(index, 1);
            this.toggleDropdown(index);
        },
    },
    computed: {
        activeContact() {
            return this.contacts.find((el) => el.id === this.currentId);
        },
        contactsFiltered() {
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    mounted() {
        console.log(this.contacts);
    }
}).mount('#app')