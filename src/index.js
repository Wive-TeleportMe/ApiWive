const express = require('express');
const app = express();
const port = 3000;

import './login.js';

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
