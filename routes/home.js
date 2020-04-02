// routes/home.js
const express = require('express')
const router = express.Router()

//載入 model
const db = require('../models')
const Todo = db.Todo
const User = db.User

//載入 auth middleware
const { authenticated } = require('../config/auth')

//設定首頁路由
//列出全部Todo
router.get('/', authenticated, (req, res) => {
  res.send('列出全部Todo')
})

module.exports = router