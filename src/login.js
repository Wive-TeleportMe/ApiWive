const express = require('express');
const Crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();

const { Sequelize, DataTypes, Model } = require('sequelize');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Connexion à la base de données
const sequelize = new Sequelize('wive_teleportme', 'wive', 'WiveTeleportMe13', {
    host: 'mysql-sabergrou.alwaysdata.net',
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

sequelize.sync()
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

/*app.get('/login', (req, res) => {
    const auth = req.header('Authorization');

    const isBasicAuth = auth && auth.startsWith('Basic ');
    if (!isBasicAuth) {
        res.status(401).send('Unauthorized Authorization header is missing');
        return;
    }

    const credentials = auth.split(' ')[1];
    const raw = Buffer.from(credentials, 'base64').toString('utf8');
    const [local_username, local_password] = raw.split(':');

    for (const user of users) {
        let temp_local_password = Crypto.createHash('SHA256').update(local_password).digest('hex');
        if (user.username === local_username && user.local_password === temp_local_password) {

            const token = jwt.sign(
                {
                    sub: user.id,
                    local_user: user.local_user,
                    local_password: user.local_password
                },
                'secret',
                {expiresIn: '1 hour'}
            );
            res.json({token});
            return;
        }
    }

    res.status(401).send('Unauthorized Invalid username or password');
});

app.get('/sign', (req, res) => {
    const auth = req.header('Authorization');
    let Exit = false;

    const isBasicAuth = auth && auth.startsWith('Basic ');
    if (!isBasicAuth) {
        res.status(401).send('Unauthorized');
        return;
    }

    const credentials = auth.split(' ')[1];
    const raw = Buffer.from(credentials, 'base64').toString('utf8');
    let [local_username, local_password] = raw.split(':');

    local_username.toLowerCase();

    for (const user of users) {

        if (local_username === user.local_user.toLowerCase()) {
            res.status(200).send('User Already Exists');
            Exit = true;
            return;
        }
    }
    if (Exit == true) {
        return;
    } else {
        local_password = Crypto.createHash('SHA256').update(local_password).digest('hex');
        let ID = 0;
        for (const user of users) {
            ID = user.id;
        }
        ID++;
        let data = {
            "id": ID,
            "local_user": local_username,
            "local_password": local_password,
            "local_role": local_role,
            "email": email
        }

        users.push(data);

        users.forEach(function (item, index) {
            fs.writeFile('users.json', JSON.stringify(users), function (err) {
                if (err) return console.log(err);
            });
        });

        res.status(200).send('Creation Successful');
    }
});

app.get('/renew', (req, res) => {
    const auth = req.header('Authorization');

    const isBasicAuth = auth && auth.startsWith('Basic ');
    if (!isBasicAuth) {
        res.status(401).send('Unauthorized');
        return;
    }

    const decodedValue = JSON.parse(Buffer.from(req.query.token.split('.')[1], 'base64').toString('ascii'));

    const token = jwt.sign(
        {
            sub: decodedValue.sub,
            local_user: decodedValue.local_user,
            local_password: decodedValue.local_password
        },
        'secret',
        {expiresIn: '1 hour'}
    );

    res.json({token});

    res.status(200).send('Renew Successful');

});*/

app.get('/users', (req, res) => {
    const auth = req.header('Authorization');

    const isBasicAuth = auth && auth.startsWith('Basic ');
    if (!isBasicAuth) {
        res.status(401).send('Unauthorized');
        return;
    }

    let usersName = [];

    for (const user of Users) {
        usersName.push(user.username);
    }

    const decodedValue = JSON.parse(Buffer.from(req.query.token.split('.')[1], 'base64').toString('ascii'));

    res.json(usersName);
});

/*app.get('/editor', (req, res) => {
    const auth = req.header('Authorization');

    const isBasicAuth = auth && auth.startsWith('Basic ');
    if (!isBasicAuth) {
        res.status(401).send('Unauthorized');
        return;
    }

    const decodedValue = JSON.parse(Buffer.from(req.query.token.split('.')[1], 'base64').toString('ascii'));

    let valideUser = null;

    for (const user of users) {
        if (user.local_user === decodedValue.local_user || decodedValue.local_user === 'admin') {
            valideUser = user;
        }
    }

    if (valideUser != null) {
        if (req.query.user != undefined){
            for (const user of users) {
                if (user.local_user === decodedValue.local_user) {
                    user.local_user = req.query.user;
                    users.forEach(function (item, index) {
                        fs.writeFile('users.json', JSON.stringify(users), function (err) {
                            if (err) return console.log(err);
                        });
                    });
                }
            }
        }

        if (req.query.password != undefined) {
            for (const user of users) {
                if (user.local_user === decodedValue.local_user) {
                    user.local_password = Crypto.createHash('SHA256').update(req.query.password).digest('hex');
                    users.forEach(function (item, index) {
                        fs.writeFile('users.json', JSON.stringify(users), function (err) {
                            if (err) return console.log(err);
                        });
                    });
                }
            }
        }

        res.status(200).send('Access Granted');
    } else {
        res.status(401).send('Unauthorized');
    }
});*/
