import feathersClient, { makeServicePlugin, BaseModel } from '../feathers-client'

class Student extends BaseModel {
  // constructor(data, options) {
  //   super(data, options)
  // }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Student'
}
const servicePath = 'students'
const servicePlugin = makeServicePlugin({
  Model: Student,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin