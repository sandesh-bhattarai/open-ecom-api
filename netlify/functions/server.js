const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  const { MONGODB_URL } = process.env;

  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to MongoDB Atlas' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not connect to MongoDB', error: err })
    };
  }
};
