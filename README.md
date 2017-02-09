Easily insert video-streaming capabilities into your Node applications

** This library lets you implement simple client to client live video-streaming in only five steps

Step 1. Instantiate your node application and an http server (make sure to npm install http)

~~~js
var app = require('express')();
var http = require('http').Server(app);
var lib = require("nodevideostreaming");  
~~~

2. Require the nodevideostreaming library

~~~js
  var lib = require("nodevideostreaming");
~~~

3. Create a new instance of the library by passing your app and the server as arguments

~~~js
  var lib = new lib(app,http);
~~~

4. Serve your html files through your app using the sendFile function on the lib, not the native sendFile function

~~~js
app.get('/',function(req,res){
	lib.sendFile(__dirname + "/test-html.html",res);
})
~~~

5. Your html file now has two helper functions defined: insertStreamer and insertClient. Both take a string representing the id of a div on your html page as an argument.

insertStreamer opens the user's webcam and begins streaming video. It also attaches a video to the div whose id you passed in, so that the user can see their own cameras output

Example: to start streaming from a webcam, your html could look like this

~~~html
<html>
	<head>
	</head>
	<body>
		<div id ="Test"></div>
		<script>
			insertStreamer("Test");
		</script>
	</body>
</html>
~~~html
This will only work if you've served your html file using the librarys sendFile function

Then, to receive the streamed video, you run insertClient from the html. insertClient will receive any video that is streaming through your server (video will be streaming through your server if any other clients have used insertStreamer). It will insert a video of the feed into the div you specify

Example: To receive streaming video, you could do this: 

~~~html
<html>
	<head>
	</head>
	<body>
		<div id ="Test"></div>
		<script>
			insertStreamer("Client");
		</script>
	</body>
</html>
~~~html

Note: For the moment, this library only supports one streamer streaming at once

