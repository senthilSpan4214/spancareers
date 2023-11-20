const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const URI = "mongodb+srv://senthilkumar:senthil4214@cluster0.guv35gp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(`Error: ${error.message}`); 
  } 
};  
 
module.exports = connectDB
          
