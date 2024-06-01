const admin = require('firebase-admin');
const db = admin.firestore();

const createBoard = async (req, res) => {
	const { name, description } = req.body;
	const userEmail = req.user.email; // Sử dụng email làm định danh
  
	try {
	  const newBoard = {
		name,
		description,
		userEmail, // Lưu email để xác định người tạo bảng
		createdAt: new Date().toISOString()
	  };

	  console.log('data board', name);
  
	  // Thêm bảng mới vào Firestore
	  const boardRef = await admin.firestore().collection('boards').add(newBoard);
  
	  res.status(201).json({
		id: boardRef.id,
		...newBoard
	  });
	} catch (error) {
	  console.error('Error creating board:', error);
	  res.status(500).json({ error: 'Error creating board' });
	}
  }

const getAllBoards = async (req, res) => {
	try {
	  const userEmail = req.user.email; // Lấy email từ thông tin người dùng đã xác thực
  
	  const boardsSnapshot = await admin.firestore().collection('boards').where('userEmail', '==', userEmail).get();
  
	  const boards = [];
	  boardsSnapshot.forEach((doc) => {
		boards.push({
		  id: doc.id,
		  ...doc.data()
		});
	  });
  
	  res.status(200).json(boards);
	} catch (error) {
	  console.error('Error retrieving boards:', error);
	  res.status(500).json({ error: 'Error retrieving boards' });
	}
  }


const getBoardById = async (req, res) => {
  const boardId = req.params.id;

  try {
    const doc = await db.collection('boards').doc(boardId).get();

    if (!doc.exists) {
      return res.status(404).send({ error: 'Board not found' });
    }

    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error retrieving board:', error);
    res.status(500).send({ error: 'Error retrieving board' });
  }
};

const updateBoard = async (req, res) => {
  const boardId = req.params.id;
  const { name, description } = req.body;

  try {
    await db.collection('boards').doc(boardId).update({
      name,
      description
    });

    res.status(200).send({
      id: boardId,
      name,
      description
    });
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).send({ error: 'Error updating board' });
  }
};

const deleteBoard = async (req, res) => {
  const boardId = req.params.id;

  try {
    await db.collection('boards').doc(boardId).delete();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).send({ error: 'Error deleting board' });
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};
