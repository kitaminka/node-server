const http = require('http');
const page = require('./files');
module.exports = {
    async start() {
        http.createServer((request, response) => {

            if (request.url === '/') {
                this.redirectHome(response);
            } else if (request.url.startsWith('/public/')) {
                this.returnFile(request, response);
            } else  {
                this.returnPage(request, response);
            }
        }).listen(80);
    },
    async redirectHome(response) {
        response.statusCode = 302;
        response.setHeader('Location', '/home/');
        response.end();
    },
    async returnPage(request, response) {
        page.getPage(request.url.slice(1), response).then( (content) => {
            response.setHeader('Content-Type', 'text/html');
            response.statusCode = 200;
            response.write(content);
            response.end();
        });
    },
    async returnFile(request, response) {
        page.getFile(request.url).then( (content) => {
            response.statusCode = 200;
            response.write(content);
            response.end();
        });
    }
}