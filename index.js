const server = require('./src/server');
const config = require('./config.json');

server.start().then(() => {
    console.log(`Server started on port ${config.port}`);
});