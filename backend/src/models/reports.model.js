// reports-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'reports';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      attended: {
        type: String,
        enum: [
          'Present',
          'SchoolAbsent',
          'SchoolAttended',
          'TeacherResricted',
          'TeacherRescrictedExam',
        ],
        required: true,
      },
      matrixResults: [
        {
          type: Number,
          default: 1,
          required: true,
        },
      ],
      notes: {
        type: String,
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
