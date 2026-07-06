const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://pierre:${password}@cluster0.4xqjkrf.mongodb.net/phoneApp?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model('Phone', phoneSchema);

if (process.argv.length > 3) {
  const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4],
  });
  phone.save().then((result) => {
    console.log(`${phone} saved`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Phone.find({}).then((result) => {
    result.forEach((phone) => {
      console.log(phone);
    });
    mongoose.connection.close();
  });
}

// const phone = new Phone({
//   name: 'Pierre',
//   number: '932-213-3212',
// });

// phone.save().then((result) => {
//   console.log('Phone saved');
//   mongoose.connection.close();
// });
