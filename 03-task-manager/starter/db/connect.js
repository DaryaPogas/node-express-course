const mongoose = require('mongoose')

const connectionString =
  "";


const connectDB = (url) =>{
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

  module.exports = connectDB
