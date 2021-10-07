const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")


const app = express();


// using mongosse module to connect to cloud
mongoose
  .connect(process.env.MONGO_URI, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo cloud");
  })
  .catch((err) => {
    console.log(err);
  });

  // middle ware
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)

  // app listening on this port
app.listen(process.env.PORT, () => {
  console.log(`app is litening ${process.env.PORT}`);
});
