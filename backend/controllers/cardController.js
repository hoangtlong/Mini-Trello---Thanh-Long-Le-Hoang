const admin = require('firebase-admin');


// Function to retrieve all cards for a specific board
const getAllCards = async (req, res) => {
    const { boardId } = req.params;

    try {
        // Query Firestore to get all cards for the specified board
        const cardsSnapshot = await admin.firestore().collection('boards').doc(boardId).collection('cards').get();

        // Process the snapshot to extract card data
        const cards = [];
        cardsSnapshot.forEach((doc) => {
            const cardData = doc.data();
            cards.push({
                id: doc.id,
                name: cardData.name,
                description: cardData.description
            });
        });

        // Send the cards data as response
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error retrieving cards:', error);
        res.status(500).json({ error: 'Error retrieving cards' });
    }
};

const createCard = async (req, res) => {
    const { boardId } = req.params;
    const { name, description } = req.body;
    const userEmail = req.user.email; // Assuming user is authenticated and user email is available in req.user

    console.log('Received boardId:', boardId);
    console.log('Creating card with name:', name);

    if (!boardId || boardId.trim() === '') {
        return res.status(400).json({ error: 'Invalid boardId' });
    }

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

        // Notify clients about the new card (assuming this function is defined elsewhere in your code)
        notifyClientsAboutNewCard(cardData);

        res.status(201).json(cardData);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Error creating card' });
    }
};

const notifyClientsAboutNewCard = (cardData) => {
    console.log('Notifying clients about new card:', cardData);
};


module.exports = {
    getAllCards,
    createCard,
};
