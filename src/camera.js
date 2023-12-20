const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { Sequelize, DataTypes, Model } = require('sequelize');

app.use(bodyParser.json());

// Connexion à la base de données
const sequelize = new Sequelize('wive_teleportme', 'wive', 'WiveTeleportMe13', {
    host: 'mysql-sabergrou.alwaysdata.net',
    dialect: 'mysql',
  });
  

  class Camera extends Model {}

  Camera.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.DATE
    },
    user: {
      type: DataTypes.INTEGER
    },
    password: {
      type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'wive_teleportme',
    tableName: 'camera' // specify the table name
  });

// Synchronisation du modèle avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });   