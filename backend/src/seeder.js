const logger = require('./logger.js');
const faker = require('faker/locale/en_AU');

faker.seed(1337);

const superTestAdmin = {
  email: 'testadmin@p2srugbyworks.com',
  password: 'Qwerty123',
};

const adminCount = 3;
const totalCoaches = 20;
const totalSchools = 10;
const studentsPerSchool = 10;

const testPass = 'a';

const ethnicityList = ['Other'];
const genderList = ['Male', 'Female', 'Other'];
const schoolSuffixes = [
  'School',
  'High School',
  'Primary School',
  'College',
  'School for Boys',
  'School for Girls',
  'High School for Boys',
  'High School for Girls',
  'College for Boys',
  'College for Girls',
];
const schoolFormats = [
  '{{name.lastName}} ',
  '{{address.county}} ',
  '{{name.lastName}} {{address.county}} ',
  '{{address.country}} ',
  '{{name.lastName}} {{address.country}} ',
  '{{address.city}} ',
  '{{name.lastName}} {{address.city}} ',
];

function createUserObject(type) {
  const name = {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  };
  const ethnicity = ethnicityList;
  const gender = faker.random.arrayElement(genderList);

  const role = type === 'admin' ? 'admin.is' : 'coach.is';

  return {
    name,
    email: faker.internet.email(
      name.first,
      name.last,
      type.concat('.fake.net')
    ),
    password: testPass,
    isVerified: true,
    culture: ethnicity,
    gender,
    [role]: true,
  };
}

function createSchoolObject() {
  const suffix = faker.random.arrayElement(schoolSuffixes);
  const format = faker.random.arrayElement(schoolFormats);

  return {
    name: faker.fake(format.concat(suffix)),
    phoneNumber: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetName(),
      suburb: faker.address.city(),
      postcode: faker.address.zipCode('####'),
    },
  };
}

function createStudentObject(schoolId) {
  return {
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    },
    DOB: faker.date.past(),
    gender: faker.random.arrayElement(genderList),
    culture: ethnicityList,
    birthCountry: faker.address.country(),
    DOA: faker.date.past(),
    schoolYear: faker.random.number({ min: 7, max: 12 }),
    consent: true,
    language: {
      englishCompetent: true,
      nativeLanguage: 'Euclidean',
    },
    contact: {
      home: {
        name: faker.name.findName(),
        homeNumber: faker.phone.phoneNumber(),
        mobileNumber: faker.phone.phoneNumber(),
      },
      emergency: {
        name: faker.name.findName(),
        mobileNumber: faker.phone.phoneNumber(),
      },
    },
    school: schoolId.toString(),
  };
}

function findAndCreate(app, serviceName, object, params) {
  const service = app.service(serviceName);

  return new Promise(resolve => {
    service
      .find(params)
      .then(result => {
        if (result.data.length === 0) {
          service.create(object, params).then(resolve);
        } else {
          resolve(result.data[0]);
        }
      })
      .catch(err => logger.error(err));
  });
}

module.exports = async function(app) {
  console.time('Time taken');
  logger.info('Starting harvest cycle');
  logger.info('Plowing fields');
  logger.info('Growing schools');

  const schoolPromises = [];

  for (let i = 0; i < totalSchools; i += 1) {
    const school = createSchoolObject();
    schoolPromises.push(
      findAndCreate(app, 'schools', school, {
        query: {
          name: school.name,
          $select: ['_id'],
        },
      })
    );
  }
  const schoolsResult = Promise.all(schoolPromises);

  logger.info('Growing users');

  // Create super admin
  app
    .service('users') // In case admin tag is changed to false
    .find({
      query: {
        email: 'testadmin@p2srugbyworks.com',
      },
    })
    .then(result => {
      if (result.data.length === 0) {
        return app.service('users').create({
          ...superTestAdmin,
          name: {
            first: 'Test',
            last: 'Admin',
          },
          gender: 'Other',
          culture: ethnicityList,
          darktheme: true,
          'admin.is': true,
          'coach.is': true,
          isVerified: true,
        });
      }
      return app.service('users').patch(result.data[0]._id, {
        'admin.is': true,
        'coach.is': true,
      });
    })
    .catch(err => console.log(err));

  // Create admins
  const adminPromises = [];

  for (let i = 0; i < adminCount; i += 1) {
    const admin = createUserObject('admin');
    adminPromises.push(
      findAndCreate(app, 'users', admin, {
        query: {
          email: admin.email,
          'admin.is': true,
        },
      })
    );
  }

  // Create coaches
  const coachPromises = [];

  for (let i = 0; i < totalCoaches; i += 1) {
    const coach = createUserObject('coach');

    coachPromises.push(
      findAndCreate(app, 'users', coach, {
        query: {
          email: coach.email,
          'coach.is': true,
        },
      })
    );
  }

  const allSchoolPromises = schoolsResult
    .then(async schools => {
      logger.info('Growing students');

      const studentPromises = [];

      schools.forEach(school => {
        for (let i = 0; i < studentsPerSchool; i += 1) {
          const student = createStudentObject(school._id);

          studentPromises.push(
            findAndCreate(app, 'students', student, {
              query: {
                name: student.name,
                gender: student.gender,
                school: student.school,
                $select: ['_id', 'name'],
              },
            })
          );
        }
      });

      return Promise.all(studentPromises);
    })
    .catch(err => console.log(err));

  await Promise.all([adminPromises, coachPromises, allSchoolPromises]);

  logger.info('Harvest complete!');
  console.timeEnd('Time taken');
};
