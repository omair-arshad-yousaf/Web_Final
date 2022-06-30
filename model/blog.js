const mongoose= require("mongoose");

const schema= new mongoose.Schema({
    author:{
        type:String,
        initialcap:true,
        required:true
    },
    title:{
        type:String,
        initialcap:true,
        required:true
    },
    description:{
        type:String,
        minLength:50,
        maxLength:500,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    category:{
        type:String,
        uppercase:true,
        required:true
    }
})
const blogDB=mongoose.model('blog',schema);
module.exports=blogDB;