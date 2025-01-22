const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongo Db Conncet sucessfully');

    }

    catch(error){
        console.error('Mongo Db Conncet error',error);
        process.exit(1);

    }
}

module.exports= connectDB;