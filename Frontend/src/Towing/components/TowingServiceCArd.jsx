
import React, { useState } from 'react';
import { useTowingServiceStore } from '../store/towingService';
import './towingServiceCard.css'; // Include the CSS file

const TowingServiceCard = ({ towingService }) => { 
    const [updatedService, setUpdatedService] = useState(towingService);
    const [isEditing, setIsEditing] = useState(false);

    const { deleteTowingService, updateTowingService } = useTowingServiceStore();

    const handleDeleteTowingService = async (tsid) => {
        const { success, message } = await deleteTowingService(tsid);
        alert(success ? "Success: " + message : "Error: " + message);
    };

    const handleUpdateTowingService = async () => {
        const { success, message } = await updateTowingService(towingService._id, updatedService);
        setIsEditing(false);
        alert(success ? "Success: " + message : "Error: " + message);
    };

    return (
        <div className="card">
            <h3 className="card-heading">{towingService.name}</h3>
            <p className="card-price">Rs. {towingService.price}</p>
            <div className="card-actions">
                <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
                    <span className="icon">✏️</span>Edit
                </button>
                <button onClick={() => handleDeleteTowingService(towingService._id)} className="delete-btn">
                    <span className="icon">🗑️</span>Delete
                </button>
            </div>

            {isEditing && (
                <div className="edit-form">
                    <input
                        type="text"
                        placeholder="Towing Service Name"
                        value={updatedService.name}
                        onChange={(e) => setUpdatedService({ ...updatedService, name: e.target.value })}
                        className="edit-input"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={updatedService.price}
                        onChange={(e) => setUpdatedService({ ...updatedService, price: e.target.value })}
                        className="edit-input"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={updatedService.description}
                        onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })}
                        className="edit-input"
                    />
                    <div className="edit-actions">
                        <button onClick={handleUpdateTowingService} className="update-btn">Update</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TowingServiceCard;
