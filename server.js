const path = require('path');
const express = require('express');
// const session = require('express-session');
const exphbs = require('express-handlebars');
const cors = require('cors');
const routes = require('./develop/controllers');
const adminRoutes = require('./develop/controllers/api/adminRoutes');
const sequelize = require('./develop/config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  layoutsDir: 'develop/views/layouts',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './develop/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/develop/public')));

// Enable CORS for all routes
app.use(cors());

app.use('/api/admin', adminRoutes);

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
