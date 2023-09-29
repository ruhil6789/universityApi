import mongoose from "mongoose";

const Course = new mongoose.Schema({
   
    university:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    level:{
        type:String,
        require:true
    }


})

export default mongoose.model("course",Course);