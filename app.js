// app.js
// add repuire modules in this project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// const value
const app = express()
const port = 3000

// 判斷開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入 Ｍodel
const db = require('./models')
const Todo = db.Todo
const User = db.User



// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set bodyParser and methodOverride
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// set session
app.use(session({
  secret: 'hotcat',
  resave: 'false',
  saveUninitialized: 'false'
}))


//使用passport - 要比router之前
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

//使用 connect-flash
app.use(flash())
app.use((req, res, next) => {
  //辨識使用者是否已經登入用的變數
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  //新增兩個flash message變數
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// set router
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/todos', require('./routes/todo'))
app.use('/auth', require('./routes/auths'))

// port listening
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})