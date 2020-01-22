const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
//APP CONFIGURATIONS
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE MODEL
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
// 	title: "DEMO",
// 	image: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
// 	body: "HELLO THIS IS A BLOG POST DEMO"
// })


//RESTful Routes

app.get("/",function(req,res){
	res.redirect('/blogs');
})

app.get("/blogs",function(req,res){
		Blog.find({},function(err,data){
		if(err){
			console.log("ERROR :" + err);
		}else{
		    res.render("index",{blogs:data});
		}
	});
});


app.get("/blogs/new", function(req,res){
	res.render("new");
})

app.post("/blogs",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.render("new");
		}else{
			res.redirect('/blogs');
		}
	})
})


app.get('/blogs/:id',function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.render("show",{blog:foundBlog});
		}
	})
})

app.get('/blogs/:id/edit',function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.render("edit",{blog:foundBlog});
		}
	})
})

app.put('/blogs/:id',function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.redirect('/blogs/'+req.params.id);
		}
	})
})

app.delete('/blogs/:id',function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err,updatedBlog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.redirect('/blogs');
		}
	});
});

//SERVER INITIALIZE AND LISTEN
app.listen(3000,function(){
	console.log("Server has started at PORT 3000");
});