const fs = require('fs'),
    path = require('path'),
    readline = require('readline'),
    config = require('../sgconfig.json');

var writeS = "", nScript = 1, f = readFilesFromFolder(config.input);
if (config.buildFullSnippetFile) {
    writeS = config.buildFullSnippetFile ? createWriteStreamObj("snnipets.json") : '';
    writeS.write(`{ \n`);
}
f.forEach((file) => {
    var lines = [];
    writeS = config.buildFullSnippetFile ? writeS : createWriteStreamObj(file);
    readline.createInterface({
        input: fs.createReadStream(file.path)
    }).on('line', (l) => {
        lines.push('\"' + l.replace(/["]/g, '\\"') + '\", \n');
    }).on('close', () => {
        writeS.write(`\"${file.name.replace(/\.js$/, '')}\": { \n`);
        writeS.write(`\"prefix\": \"${file.name.replace(/\.js$/, '')}\", \n`);
        writeS.write(`\"body\": [ \n ${lines.join("")}], \n`);
        writeS.write(`\"description\": \"${file.name.replace(/\.js$/, '')}\", \n`);
        writeS.write(`}, \n`);
        if (config.buildFullSnippetFile && f.indexOf(file) == f.length - 1) writeS.write(`} \n`);
        console.log("Done " + file.name + "! " + nScript + "\n");
        nScript++;
    })
});

function createWriteStreamObj(fileName) {
    try {
        return fs.createWriteStream(config.output + fileName.replace(/\.js$/, '.json'));
    } catch (e) {
        console.log("Erro createWriteStream: " + e);
        throw e;
    }
}


function readFilesFromFolder(folder) {
    var files = [];
    fs.readdirSync(folder).forEach(file => {
        const fullPath = path.join(folder, file);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(readFilesFromFolder(fullPath));
        } else {
            files.push({
                path: fullPath,
                name: file
            });
        }
    });
    return files;
}








