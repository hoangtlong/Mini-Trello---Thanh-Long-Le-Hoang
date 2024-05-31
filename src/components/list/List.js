import React from 'react';
import Card from '../card/AddCard';
import './List.css';

function List({ title, cards }) {
    return (
        <div className="list">
            <h3>{title}</h3>
            {cards.map((card, index) => (
                <Card key={index} content={card} />
            ))}
            <div className="add-card">
                + Add a card
            </div>
        </div>
    );
}

export default List;
