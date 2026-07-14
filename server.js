import mongoose from "mongoose";




import app from "./src/app.js";
import errorMiddleware from "./src/Middleware/error-middleware.js";

app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{
    console.log(`Running on PORT :${process.env.PORT}`)
})
