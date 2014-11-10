
// Suggested from Readme
var getMessages = function () {$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  // data: '',
  contentType: 'application/json',
  success: function (data) {
    parseMessages(data);
    console.log(data);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to get messages');
  }
});
};


var parseMessages = function(allMessages){
  _.each(allMessages.results, function(msg){
    if(!/alert/.test(msg.text) && !/\<img/.test(msg.text)){
      var output = '<li>' + msg.username + ': ' + msg.text + '@' + msg.createdAt + '</li>';
      $('.messages').prepend(output);
      while ($('.messages').children().length >20) {
        $('.messages').children().last().remove();
      }
    }
  });
};

setInterval(getMessages, 1000);


