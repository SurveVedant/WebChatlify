<!DOCTYPE html>
<html>
<head>
  <title>WebChatlify</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="styles.css">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
<div class="container">
    <br>
    <div class="jumbotron custom-jumbotron">
        <h1 class="display-4 custom-heading">Send Your Message</h1>
        <br>
        <input id="name" class="form-control custom-input" placeholder="Name">
        <br>
        <textarea id="message" class="form-control custom-textarea" placeholder="Your Message Here"></textarea>
        <br>
        <button id="send" class="btn btn-success custom-btn">Send</button>
    </div>
    <div id="messages" class="custom-messages">

    </div>
</div>
<script>
   var socket = io();
    $(() => {
        $("#send").click(()=>{
            sendMessage({name: $("#name").val(), message: $("#message").val()});
        })

        // Trigger send button click when Enter key is pressed in the message textarea
        $("#message").keypress((event) => {
            if (event.which == 13) {
                event.preventDefault(); // Prevent default action of Enter key (i.e., newline in textarea)
                $("#send").click(); // Simulate click on send button
            }
        });

        getMessages()
    })

    socket.on('message', addMessages)

    function addMessages(message){
        $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`)
    }

    function getMessages(){
      $.get(`http://${domain}/messages`, (data) => {
        data.forEach(addMessages);
      })
    }

    function sendMessage(message){
      $.post(`http://${domain}/messages`, message)
    }
</script>
</body>
</html>
