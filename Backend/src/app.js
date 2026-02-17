require("dotenv").config();
const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");

const app=express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Health check (important for Azure)
app.get("/health",(req,res)=>{
  res.json({status:"UP"});
});

app.use("/api/v1/jobs",
  require("./routes/jobRoutes"));

app.use("/api/v1/auth",
    require("./routes/authRoutes"));
  

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
  console.log("Server running on",PORT);
});
