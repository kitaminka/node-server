const server = require('./src/server');

server.start().then(() => {
    console.log('Server started!')
});