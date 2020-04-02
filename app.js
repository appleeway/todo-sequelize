// app.js
// add repuire modules in this project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// const value
const app = express()
const port = 3000

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

// port listening
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})