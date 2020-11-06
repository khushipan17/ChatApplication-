<!DOCTYPE html>
<html>
    <head> 
        <title>Chat Application</title>
    <link rel = "stylesheet"  href="{{asset('css/app.css')}}">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <style>

        .list-group {

            overflow-y : scroll;
            height: 200px;
        }
    </style>
    </head>
    <body> 

        <div class="continer">
            <div class="row" id = "app">

                 
             <div class="offset-4 col-4">


                <ul class="list-group ">
                    <li  class="list-group-item active"> Chat Room </li>
                    <message  v-for= "value in chat.message"
                    :key = value.index
                    color = "warning">

                        @{{ value}}
                    </message>
                   

                 
                  </ul>

                  <input type = "text" placeholder="Enter your message here.." class="form-control"  v-model = "message" @keyup.enter = "send" >
             </div>


               
                 
            </div>
        </div>


    <script src = " {{asset ('js/app.js') }}" >
    </script>
    </body>
</html>