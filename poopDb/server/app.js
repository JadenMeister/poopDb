import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import mysql from "mysql2";
import loginRouter from "./routes/login.js";






const app = express();
app.use(cors(
    {
      origin:"http://localhost:5173",
        credentials:true,
        optionsSuccessStatus:200
    }
));
app.use(express.json());




app.use("api/login", loginRouter)


app.use(express.json());
















app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



