const express       = require('express');
const app           = express();
const PORT          = process.env.PORT || 8080;
const mongoose      = require('mongoose');
const passport      = require('passport');
const flash         = require('connect-flash');

const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const session       = require('express-session');

const configDB      = require('./config/database');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

// https://scotch.io/tutorials/easy-node-authentication-facebook