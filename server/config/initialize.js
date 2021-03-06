var Sequelize = require('sequelize');

const Cards = require('../card/card.model');
const Episodes = require('../episode/episode.model');
const Media = require('../media/media.model');
const Podcasts = require('../podcast/podcast.model');
const Users = require('../user/user.model');
const Whitelist = require('../whitelist/whitelist.model');
const UserPodcast = require('../podcast/userPodcast.model');

var opts = {
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
  }
};

const sequelize = new Sequelize(process.env.DB_URI, opts);
const db = {};
const models = {
  Users,
  Podcasts,
  UserPodcast,
  Episodes,
  Cards,
  Media,
  Whitelist,
};

Object.keys(models).forEach((key) => {
  db[key] = models[key](sequelize, Sequelize);
});

Object.keys(db).forEach((key) => {
  if (db[key].associate) {
    db[key].associate(db);
  }
});


module.exports = { sequelize, db };
