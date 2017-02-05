function stream(app){
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	io.on('connection', function(socket) {
	   socket.on('picdata',function(data){
	   // console.log(data);
	    //console.log(data)
	      io.sockets.emit('broadcast',data);
	    })
	}
}

function sendFile(path,res){
	var toinsert = fs.readFileSync(__dirname + "/toInstall.html","utf8");
	var html = fs.readFileSync(path,"utf8");
	var index = html.indexOf("<head>") + 7;
	//console.log(path);
	html = html.slice(0,index) + toinsert + html.slice(index)
	res.send(html);
}
module.exports = {
	sendFile: sendFile,
	stream: stream
}