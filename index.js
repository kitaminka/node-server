const server = require('./src/server');
require('dotenv').config();

server.start().then(() => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});