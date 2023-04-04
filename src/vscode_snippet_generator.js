const fs = require('fs');
const readline = require('readline');

fs.readdir("../in", (e, f) => {
    if (e) throw e;

    f.forEach((file) => {
        var writeS = fs.createWriteStream("../out/" + file.replace(/\.ts$/, '.json')),
            lines = [];

        readline.createInterface({
            input: fs.createReadStream("../in/" + file)
        }).on('line', (l) => {
            lines.push('\"' + l.replace(/["]/g, '\\"') + '\", \n');
        }).on('close', () => {
            writeS.write(`\"${file.replace(/\.ts$/, '')}\": { \n`);
            writeS.write(`\"prefix\": \"${file.replace(/\.ts$/, '')}\", \n`);
            writeS.write(`\"body\": [ \n ${lines.join("")}], \n`);
            writeS.write(`\"description\": \"${file.replace(/\.ts$/, '')}\", \n`);
            console.log("Done!")
        })
    })
});
