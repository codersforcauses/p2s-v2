// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

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
        type: String,
        index: true,
        required: true,
      },
      mobile: {
        type: String,
      },
      address: {
        required: false,
        type: {
          street: {
            type: String,
            required: true,
          },
          suburb: {
            type: String,
            required: true,
          },
          postcode: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            enum: ['WA', 'NSW', 'ACT', 'VIC', 'QLD', 'SA', 'TAS', 'NT'],
            default: 'WA',
            required: true,
          },
        }
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
      coach: {
        is: {
          type: Boolean,
          default: false,
        },
        qualifications: {
          policeClearance: {
            imageLink: {
              image: Buffer,
              expiry: Date
            },
          },
          WWC: {
            imageLink: {
              image: Buffer,
              expiry: Date
            },
          },
          medClearance: {
            image: Buffer,
            expiry: Date
          },
        },
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
