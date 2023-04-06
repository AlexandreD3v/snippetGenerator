const fs = require('fs'),
    readline = require('readline'),
    config = require('../sgconfig.json');

fs.readdir(config.input, (e, f) => {
    if (e) throw e;

    var writeS = "", nScript = 1;
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
            writeS.write(`\"${file.replace(/\.js$/, '')}\": { \n`);
            writeS.write(`\"prefix\": \"${file.replace(/\.js$/, '')}\", \n`);
            writeS.write(`\"body\": [ \n ${lines.join("")}], \n`);
            writeS.write(`\"description\": \"${file.replace(/\.js$/, '')}\", \n`);
            writeS.write(`}, \n`);
            if (config.buildFullSnippetFile && f.indexOf(file) == f.length - 1) writeS.write(`} \n`);
            console.log("Done " + file + "! " + nScript + "\n");
            nScript++;
        })
    })
})

function createWriteStreamObj(fileName) {
    try {
        return fs.createWriteStream(config.output + fileName.replace(/\.js$/, '.json'));
    } catch (e) {
        console.log("Erro createWriteStream: " + e);
        throw e;
    }
}
