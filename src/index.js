const express = require('express');
const Crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes, Model } = require('sequelize');
const bodyParser = require("body-parser");
const callEndpoint = require ('./camera.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(callEndpoint);

// Connexion à la base de données
const sequelize = new Sequelize('wive_teleportme', 'wive', 'WiveTeleportMe13', {
    host: 'mysql-wive.alwaysdata.net',
    dialect: 'mysql',
});

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'wive_teleportme',
    tableName: 'users'
});

// Import de la classe Caméra
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
    type: DataTypes.STRING
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
  tableName: 'camera'
});

sequelize.sync()
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.get('/users', (req, res) => {
    const auth = req.header('Authorization');

    const isBasicAuth = auth && auth.startsWith('Basic ');
    if (!isBasicAuth) {
        res.status(401).send('Unauthorized');
        return;
    }

    res.json(Users.findAll());
});

// ////////// CAMERA //////////

// // Récupération d'un film par ID
// app.get('/cameras/:id', async (req, res) => {

//     let cameras = await Camera.findAll();
    
//     const cameraId = parseInt(req.params.id);
//     const camera = cameras.find((m) => m.id === cameraId);
    
//     if (camera) {
//       res.json(camera);
//     } else {
//       res.status(404).json({ message: 'Camera not found' });
//     }
//     });
    

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

