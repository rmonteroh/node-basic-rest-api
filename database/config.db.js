const mongoose = require('mongoose');


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Db online');

  } catch (error) {
    throw new Error('Error connection to dabase');
  }
};


module.exports = {
  dbConnection
}