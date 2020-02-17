var mongoose = require("mongoose");
var Blog = require("./blog")
var Comments = require("./comments");
 
var seeds = [
    {
        title: "DEMO BLOG",
        body:  "Test"  
    },
    {
        title: "Random BLOG",
        body:  "Hello"  
    },
    {
        title: "Test BLOG",
        body:  "What's up"  
    }
]
 
async function seedDB(){
   //Remove all Blogs
    await Blog.remove({});
    await Comments.remove({});
    
    for(const seed of seeds){
       let blog = await Blog.create(seed);
       let comment = await Comments.create(
        {
            text: "This place is great, but I wish there was internet",
            author: "Homer"
        });
        blog.comments.push(comment);
        blog.save();
    }
}

 
module.exports = seedDB;