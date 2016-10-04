var some = function(){
	var request = new XMLHttpRequest();
	request.open('POST', '/a/router/MessageList.getMessages', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	data = "type=batch&roe=false&jobs=%5B%7B%22call%22%3A%22MessageList.getMessages%22%2C%22args%22%3A%5B%22INBOX%22%2C%5B%5D%2C0%2C5%2C%220%22%2Cnull%5D%7D%5D&wsid=" + window.location.href.split("wsid=")[1];

	request.onreadystatechange = function () {
	  var DONE = 4; // readyState 4 means the request is done.
	  var OK = 200; // status 200 is a successful return.
	  if (request.readyState === DONE) {
	    if (request.status === OK) 
	    {
	    	var data = JSON.parse(request.responseText.split(';"G9;_')[0])[0];
			data
			data.unread
			if(data.unread !=0)
			{
			  var title = data.headers[0].from[0].email
			  var tag = data.headers[0].datetime
			  var body = data.headers[0].subject
			  notifiy(title,tag,"http://thaimailservice.com/wp-content/uploads/2013/04/rackspace_big_logo1.png",body)
			}
	    } else {
	    }
	  }
	}
	request.send(data);
};

var notifiy = function notifyMe(theTitle,theTag,theIcon,theBody) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new spawnNotification(theTitle,theTag,theIcon,theBody);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new spawnNotification(theTitle,theTag,theIcon,theBody);
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}
function spawnNotification(theTitle,theTag,theIcon,theBody) {
  var options = {
  		tag:	theTag,
      body: theBody,
      icon: theIcon,
      iconUrl : theIcon
  }
  var n = new Notification(theTitle,options);
}

window.setInterval(some,10000);
