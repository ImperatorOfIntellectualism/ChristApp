const express = require('express');
const app = express()
const PORT = 3000;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://AIE:12345@christappdb.1dqq4.mongodb.net/ChristAppDB?retryWrites=true&w=majority"

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/", (req, res) => {
    console.log(req.params)

    return res.send("CACHINNATE")
})

  async function start() {
    try {
      await mongoose.connect((MONGO_URL), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
      })
    } catch (e) {
      console.log(`Server error: ${e}`);
      process.exit(1);
    }
  }
  
  start();