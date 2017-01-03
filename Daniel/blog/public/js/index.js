$(function() {
	loadPost()
})

function postOne() {
	var post = $("#post").val()
	$.post("http://localhost:7566/blog", {post:post, created:Date()}, function(data) {
	loadPost()
})

}
function loadPost() {
	$.get("http://localhost:7566/blogs", function(data) {
		var html = ""
		for (var item of data) {
			html += `<li>${item.post}&nbsp;${item.created}</li>`
		} 
		$("#blogs").html(html)
	})				
}