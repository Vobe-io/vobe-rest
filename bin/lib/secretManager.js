const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v4');

const secretManager = (options = {
    createFile: false,
    generateNew: false,
    file: undefined
}) => {

    console.log(options);
    let sm = this;
    sm.secrets = {};

    // load / create secret file
    let file = options.file || path.join('/', 'vobe', 'secrets.json');
    if (options.createFile && !fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({default: null}))
    }


    let data = JSON.parse(fs.readFileSync(file, 'utf-8').toString());
    if (data !== undefined)
        sm.secrets = Object.assign(sm.secrets, data || {});

    sm.get = (key = 'default') => {
        if (sm.secrets[key] === undefined && options.generateNew)
            sm.secrets[key] = sm.generateKey();

        sm.save();
        return sm.secrets[key];
    };

    sm.save = () => fs.writeFileSync(file, JSON.stringify(sm.secrets));
    sm.generateKey = () => uuidv1();

    return sm;
};

module.exports = secretManager;