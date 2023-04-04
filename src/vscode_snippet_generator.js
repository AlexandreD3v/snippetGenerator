const fs = require('fs');
const readline = require('readline');

fs.readdir("../in", (e, f) => {
    if (e) throw e;
    console.log(f);

    f.forEach((file) => {
        console.log(file);
        var jsonSnippet = [],
            writeS = fs.createWriteStream("../out/" + file.replace(/\.ts$/,'.json'));

        readline.createInterface({
            input: fs.createReadStream("../in/" + file)
        }).on('line', (l) => {
            writeS.write('\"' + l.replace(/["]/g, '\\"') + '\", \n');
        })
    })
});
