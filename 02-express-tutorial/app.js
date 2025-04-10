const express = require('express')
const app = express()
//const { products, people} = require('./data')
const people = require('./routes/people')


// const logger = (req, res, next) => {
//   const method = req.method;
//   const url = req.url;
//   const time = new Date().getFullYear();
//   console.log(method, url, time);
//   next();
// };

// app.get('/', logger, (req, res) =>{
//     res.send('home')
// })

//app.use(logger)  - the second way to invoke logger middleware

// static assets
app.use(express.static('./methods-public'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/api/v1/people', (req,res) =>{
//     res.status(200).json({success: true, data: people})
// })

// app.post('/api/v1/people', (req, res) =>{
//     const {name} = req.body
//     if (!name){
//         return res.status(400).json({success:false, msg:'Please provide a name'})
//     }
//     res.status(201).json({success:true, data:[...people, name]})
// })

app.use('/api/v1/people', people)



app.listen(5003, () => {
  console.log("server is listening on port 5003..");
});