$(document).ready(function(){

var postMessage = function (message) {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: sent message');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

var getMessages = function () {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      parseMessages(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages');
    }
  });
};


var parseMessages = function(allMessages){
  for (var i = allMessages.results.length -1; i>= 0; i--){
    var msg = allMessages.results[i];
    if (isClean(msg)) {
      var output = '<li>' + msg.username + ': ' + msg.text + '@' + msg.createdAt + '</li>';
      $('.messages').prepend(output);
      while ($('.messages').children().length > 50) {
        $('.messages').children().last().remove();
      }
    }
  };
};


  $('input[type=submit]').on('click',function(){
    var message = {};
    message.text = $('input[type=text]').val();
    message.roomname = 'lobby';
    message.username = window.location.search.slice(10);
    postMessage(message);
  });

  var isClean = function (obj) {
    var msg = JSON.stringify(obj)
    return !/alert/.test(msg) && !/\<img/.test(msg) && !/\<script/.test(msg);
  }

  setInterval(getMessages, 1000);

});

