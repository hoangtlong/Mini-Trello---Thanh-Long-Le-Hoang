import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateCard from './CreateCard';
import './CardList.css';

function CardList({boardId}) {
    //const { boardId } = useParams();
    const [cards, setCards] = useState([]);
    const [showCreateCard, setShowCreateCard] = useState(false);

	//console.log('card list board id', boardId)



    useEffect(() => {
        const fetchCards = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/cards/boards/${boardId}/cards`, {
                headers: {
                    method: 'GET',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCards(data);
			console.log('card dtaa', data);
        };

        fetchCards();

        const ws = new WebSocket('ws://localhost:5000');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'NEW_CARD') {
                setCards((prevCards) => [...prevCards, message.card]);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, [boardId]);

	const handleCreateCard = async (newCard) => {
        setCards((prevCards) => [...prevCards, newCard]);
    };

    return (
        <div>
            <h3>Card List</h3>
            <div className="card-list-container">
                {cards.map((card) => (
                    <div key={card.id} className="card">
                        <h4>{card.name}</h4>
                        <p>{card.description}</p>
                    </div>
                ))}
                <div className="add-list" onClick={() => setShowCreateCard(true)}>
                    + Add another list
                </div>

            </div>
			{showCreateCard && (
                    <CreateCard 
                        boardId={boardId} 
                        onClose={() => setShowCreateCard(false)} 
                        onCreate={handleCreateCard}
                    />
                )}
        </div>
    );
	
}

export default CardList;
