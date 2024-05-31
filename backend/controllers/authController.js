const admin = require('../firebaseAdmin');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ho2ngtlong@gmail.com',
    pass: 'pjse irpf uluc icbw'
  }
});

const sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: 'ho2ngtlong@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is ${code}`
  };

  await transporter.sendMail(mailOptions);
};

const signup = async (req, res) => {
  const { email } = req.body;
  try {
    const code = uuidv4().split('-')[0];
    console.log(`Sending verification code ${code} to ${email}`);
    await sendVerificationCode(email, code);

    await admin.firestore().collection('users').doc(email).set({
      email,
      verificationCode: code
    });

    res.status(201).send({ message: 'Verification code sent to email' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).send({ error: 'Error sending verification code' });
  }
};



const signin = async (req, res) => {
	const { email, verificationCode } = req.body;
	try {
	  const userDoc = await admin.firestore().collection('users').doc(email).get();
  
	  if (!userDoc.exists || userDoc.data().verificationCode !== verificationCode) {
		return res.status(401).send({ error: 'Invalid email or verification code' });
	  }
  
	  // Generate JWT token
	  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
	  // Clear verification code from the database
	  await admin.firestore().collection('users').doc(email).update({ verificationCode: null });
  
	  res.status(200).send({ accessToken: token });
	} catch (error) {
	  console.error('Error in signin:', error);
	  res.status(500).send({ error: 'Error signing in' });
	}
  };
  

const verify = async (req, res) => {
	const { email, verificationCode } = req.body;
  
	try {
	  const doc = await admin.firestore().collection('users').doc(email).get();
	  console.log('doc value', doc.data);
  
	  if (!doc.exists) {
		return res.status(400).json({ error: 'Invalid email or verification code' });
	  }
  
	  const data = doc.data();

	  console.log('data', data);

	  console.log('verified code', data.verificationCode);
  
	  if (data.verificationCode === verificationCode) {
		// Xóa mã xác thực sau khi sử dụng
		await admin.firestore().collection('verificationCodes').doc(email).delete();
  
		// Tạo token hoặc xử lý xác thực người dùng
		const token = '4a8c9791575834087cc5d7d2';
  
		res.status(200).json({ accessToken: token });
	  } else {
		res.status(401).json({ error: 'Invalid email or verification code' });
	  }
	} catch (error) {
	  res.status(500).json({ error: 'Verification failed' });
	}
  };

module.exports = {
  signup,
  verify,
  signin
};
