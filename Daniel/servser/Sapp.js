const express = require("express")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

var url = "mongodb://localhost:27017"

app.get("/blogs", function(req,res) {
    MongoClient.connect(url, function(err, db) {
        //console.log("connected")
        var collection = db.collection("post")
        collection.find().toArray(function(err, docs) {
            db.close()
            res.send(docs)
        })
    })
})

app.post("/blog", function(req, res){
    var post = req.body.post
    //console.log(post)
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection("post")
        collection.insert({ post: post, postTime: new Date() }, function(err, docs) {
            db.close()
            res.send("ok")
        })
    })
})

app.listen(5000)