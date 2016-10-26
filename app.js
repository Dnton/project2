var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
var path = require('path')
var logger = require('morgan')

var flash = require('connect-flash')
var session = require('express-session')

var passport = require('passport')
var MongoStore = require('connect-mongo')(session)
var methodOverride = require('method-override')

var port = 3000

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/project2')

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')
app.use(layout)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true,
    mongooseConnection: mongoose.connection
  })
}))

app.use(methodOverride('_method'))

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(express.static(__dirname + '/public'))

app.use(logger('dev'))

// var home = require('./routes/home')

var user = require('./routes/users')
var user_api_routes = require('./routes/users_api')

var post = require('./routes/posts')

// app.use('/', home)
app.use('/users', user)
app.use('/api/users', user_api_routes)
app.use('/posts', post)

app.listen(process.env.PORT || 3000)
console.log('Server running at http://localhost:' + port + '/')
