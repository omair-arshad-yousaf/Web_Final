const express=require("express")
const app = express();
// var API =require('rest-api');
// var api= new API();
// api.start();

app.set("view engine","ejs");

const path = require("path")

const views = path.join(__dirname,"/views")
const public= path.join(__dirname,"/public")

app.use(express.static(public))
app.use(express.static(views))

//it is used to enter json format input in our express application using post man 
////like const Blogs= new BlogDB(req.body)
//blogs.save();
app.use(express.json());


const connectDB=require("./database/connection");
connectDB();

const BlogDB=require("./model/blog.js")

app.use(express.urlencoded({extended:false}));

app.get("/home",(req,res)=>{
    if(req.query.category){
        let cat={};
            cat={category:req.query.category.split(',')};
           BlogDB.find(cat).then(users=>{
            if(!users){       
                res.render("errors/error2");
                      }
                      else{  
                      res.render("category",{users});
                  }}).catch(err=>{
                    res.render("errors/error2");
                  })
                }
    else{
    BlogDB.find().then(users=>{
        res.render("home",{users})
    })
    .catch(err=>{
        res.render("errors/error2")
})}})

app.get("/blogs",(req,res)=>{
    BlogDB.find().then(users=>{
        res.render("blogs",{users})
    })
    .catch(err=>{
        res.render("errors/error2")
})
})

//create 
app.get("/home/create",(req,res)=>{
    res.render("create");
})

app.post("/home",(req,res)=>{
    if(!req.body){
        res.status(400).render("errors/error2")
    }
    else{
        const users= new BlogDB({
            author:req.body.author,
            title:req.body.title,
            description:req.body.description,
            image:req.body.image,
            date:req.body.date,
            category:req.body.category
        })
        users.save(users).then(users=>{
            res.redirect("/home");
         })
        .catch(()=>{
            res.render("errors/error1")
        })
    }
})

app.get("/home/:id",(req,res)=>{
    console.log(req.params.id);
     if(req.params.id){
        const id = req.params.id;
        BlogDB.findById(id).then(users=>{
            if(!users){
                res.render("errors/error2")
            }
            else{
                res.render("show",{users})
            }
        }).catch(err=>{
            res.render("errors/error2")
        })
    }
    else{
        res.render("errors/error2")
    }
})

app.get("/update",(req,res)=>{
    if(req.query.id){
    const id= req.query.id;
    BlogDB.findById(id).then(users=>{
        if(!users){
            res.render("errors/error1");
        }
        else{
            res.render("update",{users})
    }   
}).catch(err=>{
    res.render("errors/error2");
})
}else{
    res.render("errors/error2");

}})

app.post("/update/:id",(req,res)=>{
   if(!req.body.date){
    res.render("errors/error1")
   }
   else if(!req.params.id){
    res.render("errors/error1")
   }
   else{
    const id = req.params.id;
    BlogDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(users=>{
        if(!req.body){
            res.render("errors/error2");
        }
       res.redirect("/home");
    }).catch(err=>{
        res.render("errors/error2");
    })
   }
})



app.get("/delete/:id",(req,res)=>{
    const id = req.params.id;
    BlogDB.findByIdAndDelete(id).then(user=>{
        if(!user){
           res.render("errors/error2")
        }
        else{
            res.redirect("/home");
        }    
    }).catch(err=>{
        res.render("errors/error2")
    })
})


// app.post("/category",(req,res)=>{
//     if(req.query.category){
//         const cat=req.body.category
//         BlogDB.findOne({category:cat}).then(users=>{
//             if(!user){
//                 res.render("errors/error1")
//              }
//              else{
//                  res.redirect("/home",{users});
//              }   
//         })
//     }
// })

app.get("/categ",(req,res)=>{
    res.render("categ_page");
})




app.listen("8500");