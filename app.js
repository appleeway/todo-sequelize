// app.js
// add repuire modules in this project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

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

// set router
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', require('./routes/user'))

// port listening
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})