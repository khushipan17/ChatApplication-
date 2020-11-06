<template>
<div >
      <li class="list-group-item" :class="className"> <slot></slot></li>

      <small class=" badge float-right badge-success"> you  </small>
</div>
  
    
</template>

<script>
    export default {

        props : [

            'color',
            'user'
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
