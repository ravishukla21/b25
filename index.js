const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());


const {connection}=require("./db");
const {userRouter}=require("./routes/user.routes");

app.use("/users",userRouter);
const {auth}=require("./middlewares/auth.middleware");


const {noteRouter}=require("./routes/note.routes");
app.use("/notes",auth,noteRouter);


app.get("/",(req,res)=>{
    res.send("homepage")
})


app.listen(4500,async()=>{
    try{
        await connection;

        console.log("connected to the db")
        console.log("server is running at port 4500")
    }
    catch(err){
        console.log(err)
        console.log("something went wrong")
    }
})