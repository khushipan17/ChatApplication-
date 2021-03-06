
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');



import Axios from 'axios';
import Vue from 'vue';

 
import Toaster from 'v-toaster';
Vue.use(Toaster, {timeout: 5000});
import VueChatScroll from 'vue-chat-scroll';
import 'v-toaster/dist/v-toaster.css';


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
            user : [],
            color:[],
            time:[]
           
        },
        typing : '',
        numberofusers : 0

    },
    
    watch:{
           message(){

            Echo.private('chat')
            .whisper('typing', {
                message: this.message
            });
           }

    },

    methods: {

      send(){
    		if (this.message.length != 0) {
          this.chat.message.push(this.message);
          this.chat.user.push('you');
          this.chat.color.push('success');
          this.chat.time.push(this.getTime());
       

          Axios.post('/send' ,{

            message : this.message
          } ).then(response => {console.log(response);
            this.message = '';
            console.log("send method is working");
          }).catch(error => {console.log(error)})
    		
    		
        }
      },
      getTime(){

          let time = new Date(); 
          let hours = time.getHours();
          let minutes = time.getMinutes();
         let ampm = hours >= 12 ? 'pm' : 'am';
           hours = hours % 12;
           hours = hours ? hours : 12; // the hour '0' should be '12'
           minutes = minutes < 10 ? '0'+minutes : minutes;
            this.time = hours + ':' + minutes + ' ' + ampm;
           return this.time;

          console.log("this method called");
             
             
      }


    },
    	
    mounted(){
 
            Echo.private('chat').listen('ChatEvent' , (e)=>{ 
            //console.log(e.message);

            this.chat.message.push(e.message);
            this.chat.user.push(e.user);
            this.chat.color.push('warning');
            this.chat.time.push(this.getTime());

             //console.log(e);
              
              //console.log(e.message);
            
            
            
            
            
            
            })

          
    .listenForWhisper('typing', (e) => {
      if(e.message != ''){
        
         this.typing = 'typing...';
      }
      else{ this.typing = '';}
        
    })

    Echo.join(`chat`)
    .here((users) => {
       //console.log(users);
       this.numberofusers = users.length;
     
    })
    .joining((user) => {
      this.numberofusers += 1;
      this.$toaster.success(user.name+'  joined chat room.')
       
    })
    .leaving((user) => {
       this.numberofusers -= 1;
       this.$toaster.warning(user.name+ ' leaved chat room')
        
    });
       

    }
});
