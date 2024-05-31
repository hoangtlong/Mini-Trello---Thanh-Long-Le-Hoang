const admin = require('firebase-admin');
const db = admin.firestore();

const createBoard = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userId;

  try {
    const boardRef = await db.collection('boards').add({
      name,
      description,
      userId
    });

    res.status(201).send({
      id: boardRef.id,
      name,
      description
    });
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).send({ error: 'Error creating board' });
  }
};

const getAllBoards = async (req, res) => {
  const userId = req.userId;

  try {
    const snapshot = await db.collection('boards').where('userId', '==', userId).get();

    if (snapshot.empty) {
      return res.status(200).send([]);
    }

    const boards = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).send(boards);
  } catch (error) {
    console.error('Error retrieving boards:', error);
    res.status(500).send({ error: 'Error retrieving boards' });
  }
};

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
