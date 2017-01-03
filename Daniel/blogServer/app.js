const express = require("express")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")

const app = express()

const url = "mongodb://127.0.0.1:27017/blog"


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/blogs', function(req, res){
    MongoClient.connect(url, function(err, db){
        var collection = db.collection("post")
        collection.find().toArray(function(err, docs){
            db.close()    
            res.json(docs)
        })      
    })   
})  


app.post("/blog", function(req, res){
    var post = req.body.post
    MongoClient.connect(url, function(err, db){
        var collection = db.collection("post")
        collection.insert({post:post, created:Date()}, function(){
            db.close()
            res.send("ok")
        })
    })
})

app.listen(7566)