/*app.get('/renew', (req, res) => {
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
