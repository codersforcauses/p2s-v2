// sessions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = function (app) {
  const modelName = 'sessions';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      date: {
        type: Date,
        index: true,
        required: true,
      },
      students: [
        {
          type: mongoose.ObjectId,
          ref: 'students',
        },
      ],
      coaches: [
        {
          type: mongoose.ObjectId,
          ref: 'users',
        },
      ],
      feedback: {
        type: String,
      },
      type: {
        type: String,
        enum: [
          'Rugby',
          'Classroom',
          'Rugby/Classroom',
          'Employability',
          'Tournament',
          'Induction',
        ],
      },
      school: {
        type: mongoose.ObjectId,
        ref: 'schools',
      },
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
