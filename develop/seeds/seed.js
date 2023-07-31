const sequelize = require('../config/connection');
const User = require('../models/User');
const Content = require('../models/Content');
const SourceArticles = require('../models/SourceArticles');

const userData = require('./userData.json');
const sourceArticleData = require('./sourceArticleData.json');
const contentData = require('./contentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Content.bulkCreate(contentData);
  await SourceArticles.bulkCreate(sourceArticleData);
};

module.exports = seedDatabase;
