// app.js
// add repuire modules in this project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// const value
const app = express()
const port = 3000
const db = require('./models')
const Todo = db.Todo
const User = db.User

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set bodyParser and methodOverride
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// set router
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 認證系統的路由
// 登入頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})
// 登入檢查
app.post('/users/login', (req, res) => {
  res.send('login')
})
// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
app.post('/users/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect('/'))
})
// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})
// port listening
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})