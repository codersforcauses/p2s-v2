// schools-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'schools';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: {
        type: String,
        index: true,
        required: true,
      },
      contact: {
        name: {
          type: String,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
      address: {
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
