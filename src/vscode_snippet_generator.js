const fs = require('fs'),
    readline = require('readline'),
    config = require('../sgconfig.json');

fs.readdir(config.input, (e, f) => {
    if (e) throw e;

    var writeS = "";
    if (config.buildFullSnippetFile) {
        writeS = config.buildFullSnippetFile ? createWriteStreamObj("snnipets.json") : '';
        writeS.write(`{ \n`);
    }
    f.forEach((file) => {
        var lines = [];
        writeS = config.buildFullSnippetFile ? writeS : createWriteStreamObj(file);
        readline.createInterface({
            input: fs.createReadStream(config.input + file)
        }).on('line', (l) => {
            lines.push('\"' + l.replace(/["]/g, '\\"') + '\", \n');
        }).on('close', () => {
            writeS.write(`\"${file.replace(/\.ts$/, '')}\": { \n`);
            writeS.write(`\"prefix\": \"${file.replace(/\.ts$/, '')}\", \n`);
            writeS.write(`\"body\": [ \n ${lines.join("")}], \n`);
            writeS.write(`\"description\": \"${file.replace(/\.ts$/, '')}\", \n`);
            writeS.write(`}, \n`);
            if (config.buildFullSnippetFile && f.indexOf(file)+1 == f.length) writeS.write(`} \n`);
            console.log("Done!")
        })
    })
})

function createWriteStreamObj(fileName) {
    try {
        return fs.createWriteStream(config.output + fileName.replace(/\.ts$/, '.json'));
    } catch (e) {
        console.log("Erro createWriteStream: " + e);
        throw e;
    }
}
