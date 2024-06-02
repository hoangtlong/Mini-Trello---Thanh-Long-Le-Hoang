import React, { useState } from 'react';

function CreateCard({ boardId, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`/api/cards/boards/${boardId}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Card created successfully:', data);
                onCreate(data);  // Update parent state with new card
                onClose();  // Close the form after successful card creation
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error creating card');
        }
    };

    return (
        <div className="create-card-form">
            <h3>Create a New Card</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Card Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Card Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Card</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreateCard;
