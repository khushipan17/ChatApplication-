<template>
<div >
      <li class="list-group-item" :class="className"> <slot></slot>  <span id = "time">  {{ time}}</span>
      </li>

      <small class=" badge float-right badge-success"> {{user}}   </small>  
</div>
  
    
</template>

<script>
    export default {

        props : [

            'color',
            'user',
            'time'
            
        ],
       
        mounted() {
            console.log('Component mounted.')
        },

        computed:{

            className(){
                return 'list-group-item-'+this.color;
            },

            badgeClass(){

                return 'badge-'+this.color;
            }
        }



    }
</script>

<style>
 
  #time{
        
         font-size : 8px;
         margin-top :10px;
         color :black;

  }

</style>