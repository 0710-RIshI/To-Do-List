const express=require("express");
const bodyParser=require("body-parser");
const https = require("https");
var items=["numpy","webdv"];
let work=[];
let workingday="working";
app=express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.post("/",function(req,res){
    
    console.log(req.body.list);
    let temp=1;
    var item = req.body.task;
    for(let i=0;i<items.length;i++){
        if(items[i]===item){
            temp=0;
        }
    }
    if(item !="" && temp!=0){
        if (req.body.list===workingday){
            work.push(item);
            res.redirect("/work");
        }
        else{
            items.push(item);
            res.redirect("/");
        }
        
    }

    
    
})

app.get("/",function(req,res){
    

    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var today = new Date()
    var day = today.toLocaleDateString("en-US", options)
    
    res.render("index",{toDay: day,tasks: items});

})

app.get("/work",function(req,res){
    
    res.render("index",{toDay: workingday,tasks: work});
})

app.listen(3000);
