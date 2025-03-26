const { readFileSync, writeFileSync } = require("fs"); //const fs = required('fs'); fs.readFileSync
const first = readFileSync('./content/first.txt', 'utf-8')
const second = readFileSync('./content/second.txt', 'utf-8')
console.log(first, second)

writeFileSync(
    './temporary/fileA.txt',
    `Here is the result: ${first}, ${second}\n`,
    { flag: "a" }
);

const result = readFileSync("./temporary/fileA.txt", 'utf-8');
console.log(result)