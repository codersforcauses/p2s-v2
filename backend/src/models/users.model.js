// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema(
    {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
      password: {
        type: String,
      },
      name: {
        first: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      mobile: {
        type: String,
      },
      emergencyContact: {
        name: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
      },
      culture: {
        type: String, // TODO add ethnicity options
      },
      DOB: {
        type: Date, // YYYY-MM-DDTHH:MM:SS.MMMZ
      },
      darktheme: {
        type: Boolean,
        default: false,
      },
      // ! Not in use
      // region: {
      //   type: mongoose.ObjectId,
      //   ref: 'regions',
      // },
      coach: {
        is: {
          type: Boolean,
          default: false,
        },
        qualifications: {
          policeClearance: {
            verified: {
              type: Boolean,
              default: false,
            },
            imageLink: {
              type: String,
            },
          },
          WWC: {
            verified: {
              type: Boolean,
              default: false,
            },
            imageLink: {
              type: String,
            },
          },
          medClearance: {
            verified: {
              type: Boolean,
              default: false,
            },
            imageLink: {
              type: String,
            },
          },
        },
        feedback: [
          {
            type: mongoose.ObjectId,
            ref: 'feedback',
            default: '',
          },
        ],
        sessions: [
          {
            type: mongoose.ObjectId,
            ref: 'sessions',
          },
        ],
      },
      admin: {
        is: {
          type: Boolean,
          default: false,
        },
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      verifyToken: { type: String },
      verifyExpires: { type: Date },
      verifyChanges: { type: Object },
      resetToken: { type: String },
      resetExpires: { type: Date },
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
