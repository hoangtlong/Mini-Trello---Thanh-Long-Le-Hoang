const admin = require('firebase-admin');

const getAllCards = async (req, res) => {
    const { boardId } = req.params;
    try {
        const cardsSnapshot = await admin.firestore().collection('boards').doc(boardId).collection('cards').get();
        const cards = cardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error getting cards:', error);
        res.status(500).json({ error: 'Error getting cards' });
    }
};

const createCard = async (req, res) => {
    const { boardId } = req.params;
    const { name, description } = req.body;
    const userEmail = req.user.email; // Assuming user is authenticated and user email is available in req.user

    try {
        const newCard = {
            name,
            description,
            createdAt: new Date().toISOString(),
            ownerId: userEmail,
        };

        const cardRef = await admin.firestore().collection('boards').doc(boardId).collection('cards').add(newCard);

        const cardData = {
            id: cardRef.id,
            ...newCard,
        };

        notifyClientsAboutNewCard(cardData);

        res.status(201).json(cardData);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Error creating card' });
    }
};

const notifyClientsAboutNewCard = (card) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'NEW_CARD', card }));
        }
    });
};

module.exports = {
    getAllCards,
    createCard,
};
