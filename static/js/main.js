
var messages = $('.messages > div'),
    socket = new WebSocket("ws://localhost:5000/chat");

function showMessage(message) {
  var author = message.author,
      msg = message.msg,
      new_message;
  new_message = $('<div class="message ' + author + '">' + msg + '</div>');
  messages.append(new_message);
  new_message.get(0).scrollIntoView(false);
}

function sendMessage(message) {
  socket.send(JSON.stringify(message));
}

function handleInput(e) {
  var msg;
  if (e.key == 'Enter') {
    msg = {'msg': $(this).val(), 'author': 'me'};
    $(this).val('');
    showMessage(msg);
    sendMessage(msg);
  }
}

$('input').on('keypress', handleInput);

socket.onmessage = function (event) {
  showMessage(JSON.parse(event.data));
};