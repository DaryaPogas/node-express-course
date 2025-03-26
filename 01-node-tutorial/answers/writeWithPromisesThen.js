const {writeFile, readFile} = require ('fs').promises
writeFile("./temporary/temp.txt", "line 1\n", { flag: "a" })
  .then(() => {
    console.log(" this was 1st line");
    return writeFile("./temporary/temp.txt", "line 2\n", { flag: "a" });
  })
  .then(() => {
    console.log(" this was 2st line");
    return writeFile("./temporary/temp.txt", "line 3\n", { flag: "a" });
  })
  .then(() => {
    console.log(" this was 3d line");
    return readFile("./temporary/temp.txt", "utf8");
  })
  .then((data) => {
    console.log("some data");
    console.log (data)
  })
  .catch((error) => {
    console.log(`an error occured: ${error}`);
  });