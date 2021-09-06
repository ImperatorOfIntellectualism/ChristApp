const { response } = require('express');
const express = require('express');
const app = express()
const PORT = 3000;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://AIE:12345@christappdb.1dqq4.mongodb.net/ChristAppDB?retryWrites=true&w=majority"
const User = require('./models/User')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./data/")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname + ".jpg")
  }
})
const upload = multer({storage: storage})


app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/", (req, res) => {
    console.log(req.params)

    return res.send("CACHINNATE")
})

app.post("/register", async (req, res) => {
  try {
    const {login, password} = req.body
    const d = new Date();
    const date = d.getMonth() + "." + d.getFullYear()
    const candidate = await User.findOne({ login: login })
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }
    const user = new User({login: login, password: password, dateOfRegistration: date, subText: "@" + login, tweets: []}) 
    await user.save()
    res.status(201).json({message: "Пользователь создан"})
} catch(e){
    res.status(500).json({message: "Что-то пошло не так, ошибка: " + e})
}
})

app.post("/getAvatar", (req, res) => {
  console.log(req.body)
  res.sendFile(__dirname + `/data/${req.body.name}.jpg`)
})

app.post("/login", async (req, res) => {
  try {
    const {login, password} = req.body
    const candidate = await User.findOne({ login: login, password: password })
    if (candidate) {
      return res.status(200).json({ message: 'Авторизирован' })
    }
    else res.status(400).json({message: "Такого пользователя нет"})
} catch(e){
    res.status(500).json({message: "Что-то пошло не так, ошибка: " + e})
}
})

app.post("/getUser", async (req, res) => {
  try {
    const login = req.body.name
    const candidate = await User.findOne({ login: login })
    if (candidate) {
      res.send(candidate)
    }
    else res.status(400).json({message: "Такого пользователя нет"})
} catch(e){
    res.status(500).json({message: "Что-то пошло не так, ошибка: " + e})
}
})

app.post("/uploadImage", upload.single("photo"),(req, res)=>{
  try {
    console.log(req.file)
    res.send("AIE")
  } catch (error) {
    console.log("AIE")
    res.status(500).json({message: "Что-то пошло не так, ошибка: " + error})
  }
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