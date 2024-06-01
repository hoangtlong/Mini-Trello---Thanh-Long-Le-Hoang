require ('dotenv').config();
const admin = require("firebase-admin");

const serviceAccount = 
	{
		"type": "service_account",
		"project_id": "mini-trello-af759",
		"private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
		"private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		"client_email": "firebase-adminsdk-anmh1@mini-trello-af759.iam.gserviceaccount.com",
		"client_id": "112650174411495380261",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-anmh1%40mini-trello-af759.iam.gserviceaccount.com",
		"universe_domain": "googleapis.com"
	  }
	  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://mini-trello-af759-default-rtdb.firebaseio.com/`
});

module.exports = admin;
