const app = require('express')();
const clc = require('cli-color');
const Table = require('cli-table');
const path = require('path');
const fs = require('fs');

let table = new Table({
    head: ['PRIORITY', 'ROUTE', 'STATUS'],
    chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}
});
let errors = [];
let routes = [];

function loadRoutes(p) {
    console.log('LOADING ' + p);
    fs.readdirSync(p, {withFileTypes: true, encoding: "utf-8"}).forEach(f => {
        if (f.isDirectory())
            loadRoutes(path.join(p, f.name));

        if (f.name !== undefined && f.name.endsWith(".js")) {
            let tData = {
                passed: false,
                data: undefined,
                path: p,
                name: f.name
            };
            try {
                tData.data = require(path.join(p, f.name));
                tData.passed = true;
                routes.push(tData);
            } catch (e) {
                errors.push(e);
                routes.push(tData);
            }
        }
    });
}

loadRoutes(path.join(__root, 'routes'));

routes
    .sort((a, b) => (a.data ? a.data.index : 0) - (b.data ? b.data.index : 0))
    .forEach(r => {
        if (r.passed) {
            app.use(r.data.router ? r.data.router : r);
            table.push([r.data.index, path.join(r.path, r.name), clc.green('PASSED')]);
        } else
            table.push(['?', path.join(r.path, r.name), clc.red('ERROR')]);
    });

console.log(table.toString());
if (errors.length > 0) console.log(clc.bold.red('\n\nENCOUNTERED ERROR(S) WHILE LOADING ROUTES:\n'));
errors.forEach(e => console.log(clc.red(e)));


module.exports = app;