
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
    var output = '<li>' + msg.username + ': ' + msg.text + '@' + msg.createdAt + '</li>';
    $('.messages').prepend(html_sanitize(output));
    while ($('.messages').children().length >20) {
      $('.messages').children().last().remove();
    }
  });
};

setInterval(getMessages, 1000);


// var escape = function(s) {
//   return s.split('#').map(function(v) {
//       // Only 20% of slashes are end tags; save 1.2% of total
//       // bytes by only escaping those.
//       var json = JSON.stringify(v).replace(/<\//g, '<\\/');
//       return json;
//       }).join('');
// }
