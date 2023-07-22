const sequelize = require('../config/connection');
const User = require('../models/User');
const Content = require('../models/Content');
const Article = require('../models/Article');

const userData = require('./userData.json');
const articleData = require('./articleData.json');
const contentData = require('./contentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Content.bulkCreate(contentData);
  await Article.bulkCreate(articleData);

  process.exit(0);
};

seedDatabase();
