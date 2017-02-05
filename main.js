"use strict";

var fs = require("fs")


class Library{
	constructor(http,io){
		this.io = io;
		var that = this;
		this.io.on('connection', function(socket) {
		  console.log('a user connected');
		   socket.on('picdata',function(data){
		    //console.log(data)
		      that.io.sockets.emit('broadcast',data);
		    })
		})
	}

	sendFile(path,res){
		// res.send("YO");
		var toinsert = fs.readFileSync(__dirname + "/toInstall.html","utf8");
		var html = fs.readFileSync(path,"utf8");
		var index = html.indexOf("<head>") + 7;
		//console.log(path);
		html = html.slice(0,index) + toinsert + html.slice(index)

		res.end(html);
	}
}


// function start(http){
// 	var io = require('socket.io')(http);
// 	io.on('connection', function(socket) {
// 	  console.log('a user connected');
// 	   socket.on('picdata',function(data){
// 	   // console.log(data);
// 	    //console.log(data)
// 	      global.io.sockets.emit('broadcast',data);
// 	    })
// 	})
// }


module.exports = Library;