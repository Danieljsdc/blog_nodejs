var http = require("http");
var url = require("url");
var controllers = require("./controller");

http.createServer (function (req, res){
	function notFoundController (req, res){
		res.writeHead(404);
		res.end("not found");
	}
	function find(ary, match) {
		for(var i = 0; i<ary.length; i++){
			if(match(ary[i])) return ary[i]
		}
	}	
	const rules = [
		{path: "/", controller: controllers.home}, 
		{path: "/user", controller: controllers.user},
		{path: /^\/static(\/.*)/, controller: controllers.static}
	];
	var pathname = url.parse(req.url).pathname;
	
	var rule = find(rules, function(rule){
		if(rule.path instanceof RegExp) {
			return pathname.match(rule.path)
		}
		return rule.path == pathname;
	}); 
	var controller = rule && rule.controller || notFoundController; 
		controller(req, res)	
}).listen(8899);