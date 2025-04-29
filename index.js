const express=require("express");
const app=express();
const {v4:uuidv4}=require('uuid');
const methodOverride=require('method-override');
const port=8080;
app.listen(8080,()=>{
    console.log("server started");
})
app.set("view engine","ejs");
app.use(express.static("public"));// you're instructing Express to serve files from the public folde
app.use(methodOverride("_method"));
app.set("views","./views");// tells Express to look for templates in the ./views folder.
let posts=[
    {
        id:"1a",
        username:"apnaCollege",
        content:"hardwork gives suceess",
    },
    {
        id:"2a",
        username:"GC",
        content:"Random One",
    }
];
app.use(express.urlencoded({extended:true}));
app.get("/Posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
//this is used to get the page to add new posts
app.get("/Posts/new",(req,res)=>{
    res.render("newposts.ejs");
   
})
app.get("/Posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((po)=>id===po.id);
    res.render("showSingle.ejs",{post});
})
app.get("/Posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((po)=>id===po.id);
    res.render("edit.ejs",{post});
})
app.patch("/Posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((po)=>id===po.id);
    post.content=newContent;
    res.redirect("/Posts");
})
app.delete("/Posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((po)=>po.id!==id);//this filters all the posts which are not equal to id so automatically the post wil be delted
    res.redirect("/Posts");
})
//after submiting the form this will submit to posts which have methos =post not get and it performs all th below code 
app.post("/Posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({username,content,id});
    res.redirect("/Posts");//by default it is get
    //res.send("posts are added");
})