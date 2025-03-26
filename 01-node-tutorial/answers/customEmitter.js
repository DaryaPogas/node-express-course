const EventEmmiter = require("events");

const customEmmiter = new EventEmmiter();

customEmmiter.on("response", (name, id) => {
  console.log(`data recieved ${name} with id: ${id}`);
});
customEmmiter.on("response", () => {
  console.log(`some other logic here`);
});

customEmmiter.emit("response", "john", 34);

const EventEmitter = require("events");
const emitter = new EventEmitter();
setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);
emitter.on("timer", (msg) => console.log(msg));  
