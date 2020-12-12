const fs = require('fs');

module.exports = {
    async getPage(name, response) {
        let content = await this.getContent(name, response);
        const header = await this.getElem('header');
        const footer = await this.getElem('footer');
        let layout = await this.getElem('layout');

        const title = content.match(/{setTitle "(.*?)"}/);
        if (title) {
            layout = layout.replace(/{getTitle}/, title[1]);
            content = content.replace(/{setTitle ".*?"}/, '');
        }
        layout = layout.replace(/{content}/, content);
        layout = layout.replace(/{menu}/, header);
        layout = layout.replace(/{footer}/, footer);

        return layout;
    },
    async getContent(name, response, statusCode = 200) {
        try {
            const content = fs.readFileSync(`./public/pages/${name}.html`, 'utf-8');
            response.statusCode = 404;
            return content;
        } catch {
            if (statusCode !== 404) {
                return await this.getContent('/404', response, 404);
            } else {
                throw '404 file don`t exist!'
            }
        }
    },
    async getElem(name) {
        return fs.readFileSync(`./public/elems/${name}.html`, 'utf-8');
    },
    async getFile(path) {
        return fs.readFileSync(`./${path}`);
    }
}
