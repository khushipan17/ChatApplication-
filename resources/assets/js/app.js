
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');



import Axios from 'axios';
import Vue from 'vue'

 
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)


window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('message', require('./components/Message.vue'));

const app = new Vue({
    el: '#app',

    data: {

        message: '',

        chat: {
            message : [],
            user : []
        }

    },
    

    methods: {

      send(){
    		if (this.message.length != 0) {
          this.chat.message.push(this.message);
       

          Axios.post('/send' ,{

            message : this.message
          } ).then(response => {console.log(response);
            this.message = '';
            console.log("send method is working");
          }).catch(error => {console.log(error)})
    		
    		
        }
      }
    },
    	
    mounted(){
 
            Echo.private('chat').listen('ChatEvent' , (e)=>{ 
            //console.log(e.message);

            this.chat.message.push(e.message);

             //console.log(e);
              
              //console.log(e.message);
            
            
            
            
            
            
            }); 
       

    }
});
