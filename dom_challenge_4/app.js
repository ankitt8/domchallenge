const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
// const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const app = express();

// Load config
dotenv.config({ path: './config/config.env' })

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// setting up static folder
app.use(express.static(path.join(__dirname, 'public')))

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
// Passport config
require('./config/passport')(passport)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routing
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// Templating
// app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', '.hbs');

const PORT = process.env.PORT || 5000;
connectDB();
try {
    app.listen(PORT, () => { console.log(`Server running ${process.env.NODE_ENV} environment at port ${PORT}`) })

} catch (err) {
    console.log(err)
}