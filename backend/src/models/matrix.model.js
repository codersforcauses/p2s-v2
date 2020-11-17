// ! Not in use
// matrix-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = 'matrix';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      category: [
        {
          name: {
            type: String,
            required: true,
          },
          matrix: [
            {
              name: {
                type: String,
                required: true,
              },
              level: [
                {
                  number: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 7,
                  },
                  description: {
                    type: String,
                    required: true,
                  },
                },
              ],
            },
          ],
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
