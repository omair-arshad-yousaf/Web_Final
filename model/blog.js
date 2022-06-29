const mongoose= require("mongoose");

const schema= new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        minLength:100,
        maxLength:300,
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
        required:true
    }
})
const blogDB=mongoose.model('blog',schema);
module.exports=blogDB;