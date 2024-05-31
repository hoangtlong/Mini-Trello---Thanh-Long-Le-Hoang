const admin = require("firebase-admin");

const serviceAccount = require('./serverAccoutKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://mini-trello-af759-default-rtdb.firebaseio.com/`
});

module.exports = admin;
