const app=require("./app");
const connectDatabase = require("./config/database");

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server listening to port ${process.env.PORT}`)
})