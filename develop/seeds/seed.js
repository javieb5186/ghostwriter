const sequelize = require('../config/connection');
const User = require('../models/User');
// const Content = require('../models/content');
const SourceArticles = require('../models/SourceArticles');

const userData = require('./userData.json');
const sourceArticleData = require('./sourceArticleData.json');
// const contentData = require('./contentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  // await Content.bulkCreate(contentData);
  await SourceArticles.bulkCreate(sourceArticleData);

  process.exit(0);
};

seedDatabase();
