const { createReadStream} = require('fs')

const stream = createReadStream(
  "./content/big.txt",
  {
    highWaterMark: 10024,
    encoding: "utf-8",
  }
);

let chunkCounter = 0;
stream.on('data', (chunk) => {
    chunkCounter++
    console.log(chunk)
})

stream.on('end', () =>{
    console.log('completed. total chunks:', chunkCounter)
})

stream.on("error", (error) => {
  console.log('an error occured', error);
});