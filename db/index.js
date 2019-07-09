const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const config = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "27017",
  name: process.env.DB_NAME || "hw4",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || ""
};

const connectionURL = `mongodb+srv://${config.user}:${config.password}@${config.host}/${config.name}`;
console.log('connecting with', connectionURL);

mongoose.set('useCreateIndex', true);

mongoose.connect(connectionURL, { useNewUrlParser: true })
  .catch((e) => console.error(e));
const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose connection open  on ${connectionURL}`);
});

db.on('error', (err) => console.error(err));

db.on('disconnected', () => {
  console.log('mongoose connection disconnected')
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('mongoose connection closed throw app terminatatnio');
    process.exit(0);
  });
});
