// ? May implement later
// programs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = function (app) {
  const modelName = 'programs';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      sessions: [
        {
          type: mongoose.ObjectId,
          ref: 'sessions',
          required: true,
        },
      ],
      school: {
        type: mongoose.ObjectId,
        ref: 'schools',
        required: true,
      },
      students: [
        {
          type: mongoose.ObjectId,
          ref: 'students',
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
