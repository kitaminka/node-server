const fs = require('fs');

module.exports = {
    async getPage(name, response) {
        let main = await this.getContent(name, response);
        const header = await this.getElem('header');
        const footer = await this.getElem('footer');
        let layout = await this.getElem('layout');

        const title = main.match(/{setTitle "(.*?)"}/);
        if (title) {
            layout = layout.replace(/{getTitle}/, title[1]);
            main = main.replace(/{setTitle ".*?"}/, '');
        }
        layout = layout.replace(/{main}/, main);
        layout = layout.replace(/{header}/, header);
        layout = layout.replace(/{footer}/, footer);

        return layout;
    },
    async getContent(name, response, statusCode = 200) {
        try {
            return fs.readFileSync(`./public/pages/${name}.html`, 'utf-8');
        } catch {
            if (statusCode !== 404) {
                response.statusCode = 404;
                return this.getContent('/404', response, 404);
            } else {
                throw '404 file don`t found!';
            }
        }
    },
    async getElem(name) {
        try {
            return fs.readFileSync(`./public/elems/${name}.html`, 'utf-8');
        } catch {
            throw `${name} don\`t found!`;
        }
    },
    async getFile(path, response, statusCode = 200) {
        try {
            return fs.readFileSync(`./${path}`);
        } catch {
            if (statusCode !== 404) {
                response.statusCode = 404;
                return this.getPage('404', response, 404);
            } else {
                throw '404 file don`t found!';
            }
        }
    }
}
