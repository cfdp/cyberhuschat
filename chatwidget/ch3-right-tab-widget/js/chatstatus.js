/* This script is called when the connection to the chat server (now.js) has been established */

(function ($) {
  var chatStatus = {};

  // The following callback is called by the server in order to
  // advertise its status.
  now.updateStatus = function (attributes) {
    chatStatus = attributes;
    $(window).trigger('opekaChatStatusUpdate', [attributes]);
  };

  // When the DOM is ready, set up the widget.
  $(function () {
    var statusTab = $('.status-tab'),
        chatButton = $('#join-pair-chat');
        
    // Updates the actual status text.
    var updateDisplay = function (attributes) {

     //For debugging...
      var debugchat = false;
      if (debugchat) {
        statusTab.css("background","url('/img/chat-close.png') no-repeat");
        chatButton.hide();
        return;
      }

      // If there are any active one-to-one rooms.
      if (chatStatus.rooms && chatStatus.rooms.pair.active > 0) {    
        statusTab.css("background","url('img/chat-open.png') no-repeat");
        chatButton.show();
      // If not, check if there are any active group rooms.
      } else if (chatStatus.rooms && chatStatus.rooms.pair.full > 0) {
        statusTab.css("background","url('img/chat-busy.png') no-repeat");       
        chatButton.hide();
      // For the moment we show the chat as busy as soon as the server is running
      // @todo: make a checkbox in the admin UI where the chat can be set to "on" to replace this
      } else {
        statusTab.css("background","url('img/chat-busy.png') no-repeat");
        chatButton.hide();
      };

     };
     
    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);
    
    // When the user clicks the button, ask the chat server to join a room.
    chatButton.click(function () {
	if(!$.browser.opera){	
		var w = open_window('_blank','http://cyberchat.dk/opeka', 1000, 700);
	}else{
		window.parent.location = "http://cyberchat.dk/chat-on-opera";
	}

      now.getDirectSignInURL('pair', function (signInURL) {
        if (!(chatStatus.rooms && chatStatus.rooms.pair.active > 0) && !(chatStatus.rooms && chatStatus.rooms.pair.full > 0)) {
            w.close();
            window.location ="http://cyberhus.dk/brevkasse";
           }
        else {
			     w.location = signInURL;
           }
      });
    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));

// Build pop-up window
function open_window(window_name,file_name,width,height) {
  parameters = "width=" + width;
  parameters = parameters + ",height=" + height;
  parameters = parameters + ",status=no";
  parameters = parameters + ",resizable=no";
  parameters = parameters + ",scrollbars=no";
  parameters = parameters + ",menubar=no";
  parameters = parameters + ",toolbar=no";
  parameters = parameters + ",directories=no";
  parameters = parameters + ",location=no";

  vindue = window.open(file_name,window_name,parameters);
  return vindue;
}
