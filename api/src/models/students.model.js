// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = function(app) {
  const modelName = 'students';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: {
        type: String,
        index: true,
        required: true,
      },
      DOB: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      culture: {
        type: String,
      },
      birthCountry: {
        type: String,
      },
      DOA: {
        type: Date,
      },
      language: {
        englishCompetent: {
          type: Boolean,
          required: true,
        },
        nativeLanguage: {
          type: String,
        },
      },
      medical: {
        allergies: {
          type: String,
        },
        injuries: {
          type: String,
        },
        condition: {
          type: String,
        },
        extraInfo: {
          type: String,
        },
      },
      schoolYear: {
        type: Number,
        required: true,
      },
      consent: {
        type: Boolean,
        required: true,
      },
      contact: {
        home: {
          name: {
            type: String,
            required: true,
          },
          homeNumber: {
            type: String,
            required: true,
          },
          mobileNumber: {
            type: String,
            required: true,
          },
          email: {
            type: String,
          },
        },
        emergency: {
          name: {
            type: String,
            required: true,
          },
          mobileNumber: {
            type: String,
            required: true,
          },
        },
      },
      extraInfo: {
        type: String,
      },
      school: {
        type: mongoose.ObjectId,
        ref: 'schools',
        required: true,
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
