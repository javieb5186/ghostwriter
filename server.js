const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
const routes = require('./develop/controllers');
const sequelize = require('./develop/config/connection');
const helpers = require('./develop/utils/helpers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup sessions and session storage
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 600000, // expires after 10 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Import helpers and set directory to account for develop folder
const hbs = exphbs.create({
  helpers,
  layoutsDir: 'develop/views/layouts',
});

// Setup handlebars and directory to account for develop folder
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './develop/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/develop/public')));

// Enable CORS for all routes
app.use(cors());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
