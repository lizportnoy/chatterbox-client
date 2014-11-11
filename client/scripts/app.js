$(document).ready(function(){

var currentRoom = 'lobby';
var postsDisplayed = 50;

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
  var room = $('.rooms').find(':selected').val();
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      parseMessages(data,room);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages');
    }
  });
};


var parseMessages = function(allMessages, room){
  room = room || 'lobby';
  $('.messages').children().remove();
  for (var i = allMessages.results.length -1; i>= 0; i--){
    var msg = allMessages.results[i];
    if (isClean(msg)) {
      if (msg.roomname === room) {
        var output = '<li>' + msg.username + ': ' + msg.text + ' @' + msg.createdAt + ' in ' + msg.roomname + '</li>';
        $('.messages').prepend(output);
        while ($('.messages').children().length > postsDisplayed) {
          $('.messages').children().last().remove();
        }
      }
    }
  };
};


  $('input[type=submit].send').on('click',function(){
    var message = {};
    message.text = $('input[type=text].send').val();
    message.roomname = $('.rooms').find(':selected').val();
    message.username = window.location.search.slice(10);
    postMessage(message);
    $('input[type=text].send').val('');
  });

  $('input[type=submit].createRoom').on('click',function(){
    var newRoom = $('input[type=text].createRoom').val();
    if (!$('.rooms').find('.' + newRoom).length) {
      $('.rooms').append('<option class="' + newRoom + '">'+ newRoom + '</option>');
    }
    // change the focus of the dropdown menu to the new room
    $('.' + newRoom).attr('selected','selected');
    $('input[type=text].createRoom').val('');

  });



  var isClean = function (obj) {
    var msg = JSON.stringify(obj)
    return !/alert/.test(msg) && !/\<img/.test(msg) && !/\<script/.test(msg);
  }

  setInterval(getMessages, 1000);

});

