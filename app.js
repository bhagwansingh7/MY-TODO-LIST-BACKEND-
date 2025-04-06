const express=require('express')
const app=express()
const userRouter=require('./src/routes/user.routes')
// const homeRouter=require('./routes/index.routes')
const dotenv=require('dotenv')
dotenv.config();
const cookieParser=require('cookie-parser');
const connectDB=require('./src/config/db')
connectDB();
app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.use('/',homeRouter)
app.use('/user',userRouter)




app.listen(`${process.env.PORT}`,()=>{
    console.log(`this is run on port ${process.env.PORT}`)
})