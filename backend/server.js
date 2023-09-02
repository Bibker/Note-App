const express= require("express");
const cors = require('cors');
const notes= require('./data/notes')
const dotenv= require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require('cookie-parser');

const app= express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.get("/", (req,res)=>{
    res.send("API is RUNNINGG....")
})

// app.get("/api/notes",(req,res)=>{
//     res.json(notes);
// })

app.use("/api/users", userRoutes)
app.use("/api/notes", noteRoutes)


app.use(notFound)
app.use(errorHandler)

// app.get("/api/notes/:id",(req,res)=>{
//     const note= notes.find((n)=> n._id === req.params.id)
//     res.send(note)
// })

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`App Started at Port ${PORT}`));
