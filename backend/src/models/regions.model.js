// ! Not in use
// regions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = function (app) {
  const modelName = 'regions';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      state: {
        type: String,
        enum: ['WA', 'SA', 'QLD', 'NT', 'TAS', 'NSW', 'VIC'],
        default: 'WA',
        required: true,
      },
      users: [
        {
          type: mongoose.ObjectId,
          ref: 'users',
          required: true,
        },
      ],
      schools: [
        {
          type: mongoose.ObjectId,
          ref: 'schools',
          required: true,
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
