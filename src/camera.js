const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 3001;
const { Sequelize, DataTypes, Model } = require('sequelize');
const {readFileSync} = require('fs');

app.use(cors());

// Connexion à la base de données
const sequelize = new Sequelize('wive_teleportme', 'wive', 'WiveTeleportMe13', {
  host: 'mysql-wive.alwaysdata.net',
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
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    encoder: {
      type: DataTypes.STRING,
      allowNull: true
    },
    format: {
      type: DataTypes.STRING,
      allowNull: true
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

// Récupération d'un film par ID
app.get('/cameras/:id', async (req, res) => {

  let cameras = await Camera.findAll();

  const cameraId = parseInt(req.params.id);
  const camera = cameras.find((m) => m.id === cameraId);

  if (camera) {
    res.json(camera);
  } else {
    res.status(404).json({message: 'Camera not found'});
  }
});

// Modification d'une camera par ID
app.put('/cameras/:id', async (req, res) => {

  let cameras = await Camera.findAll();

  const cameraId = parseInt(req.params.id);
  const index = cameras.findIndex((m) => m.id === cameraId);

  if (index !== -1) {
    cameras[index] = {...cameras[index], ...req.body};
    res.json({message: 'Camera updated successfully'});
  } else {
    res.status(404).json({message: 'Camera not found'});
  }
});

// Création d'une nouvelle camera
app.post('/cameras', async (req, res) => {
  let cameras = await Camera.findAll();

  const newCamera = req.body;
  newCamera.id = cameras.length + 1;
  cameras.push(newCamera);
  res.status(201).json({message: 'Camera created successfully'});
});

// Suppression d'un film par ID
app.delete('/cameras/:id', async (req, res) => {

  let cameras = await Camera.findAll();
  const cameraId = parseInt(req.params.id);
  cameras = cameras.filter((m) => m.id !== cameraId);
  res.json({message: 'Movie deleted successfully'});
});

// Gestion des erreurs de validation
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(422).json({message: 'Validation error'});
  }
});

// Récupération des films par Nom
app.get('/cameras/namesearch/:name', async (req, res) => {
  const nameQuery = req.params.name;

  if (!nameQuery) {
    return res.status(400).json({message: 'Name parameter is required for search'});
  }

  try {
    const cameras = await Camera.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${nameQuery}%`,
        },
      },
    });

    if (cameras.length > 0) {
      res.json(cameras);
    } else {
      res.status(404).json({message: 'No cameras found with the specified name'});
    }
  } catch (error) {
    console.error('Error fetching cameras by name:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

// Récupération des caméras avec pagination
app.get('/camerasList', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page par défaut : 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Taille de la page par défaut : 10

  const offset = (page - 1) * pageSize;

  // Remove M3U8 format
  try {
    const cameras = await Camera.findAll({
      offset: offset,
      limit: pageSize,
      where: {
        format: {
          [Sequelize.Op.ne]: 'M3U8',
        }
      },
    });

    if (cameras.length > 0) {
      res.json(cameras);
    } else {
      res.status(404).json({message: 'No cameras found'});
    }
  } catch (error) {
    console.error('Error fetching cameras with pagination:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

// Récupération de toutes les caméras
app.get('/cameras', async (req, res, next) => {
  try {
    const cameras = await Camera.findAll();

    if (cameras.length > 0) {
      res.json(cameras);
    } else {
      res.status(404).json({message: 'No cameras found'});
    }
  } catch (error) {
    console.error('Error fetching cameras:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
