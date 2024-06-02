import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateCard from './CreateCard';

function CardList({boardId}) {
    //const { boardId } = useParams();
    const [cards, setCards] = useState([]);
    const [showCreateCard, setShowCreateCard] = useState(false);

	console.log('card list board id', boardId)

    useEffect(() => {
        const fetchCards = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/boards/${boardId}/cards`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCards(data);
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

    return (
        <div>
            <h3>Card List</h3>
            <ul>
                {cards.map((card) => (
                    <li key={card.id}>
                        <h4>{card.name}</h4>
                        <p>{card.description}</p>
                    </li>
                ))}
            </ul>
            <div className="add-list" onClick={() => setShowCreateCard(true)}>
                + Add another list
            </div>
            {showCreateCard && (
                <CreateCard 
                    boardId={boardId} 
                    onClose={() => setShowCreateCard(false)} 
                />
            )}
        </div>
    );
}

export default CardList;
