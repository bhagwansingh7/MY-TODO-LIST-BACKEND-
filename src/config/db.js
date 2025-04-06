const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
       const connectionInstance =await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("connected with database successfully")
        console.log(`Host is:${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("ERROR:",error)
        process.exit(1)
    }

}
module.exports=connectDB;