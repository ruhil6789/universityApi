import mongoose from "mongoose";


class DBClass{
    dbCOnnection=async()=>{

    let options:any={
        useNewUrlParser:true,
        useUnifiedTopology:true
    };

        const connect = mongoose.connect("mongodb://127.0.0.1:27017",{
            dbName:"Aggregation"
        }).then(c=> console.log("connected to  mongodb"))
        .catch((e)=>console.log(e,"error")
        )

        const db = mongoose.connection
      
        db.on("error",console.error.bind(console,"connection error"));
        db.once("opoen",()=>{
            console.log("connected successfully");
            
        })
        
    }
}

export default new DBClass