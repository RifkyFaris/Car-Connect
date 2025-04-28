import React, { useState } from 'react';
import { useTowingServiceStore } from '../store/towingService';
import styles from './CreatePage.module.css';

const CreatePage = () => {
    const [newTowingService, setNewTowingService] = useState({
        name: "",
        price: "",
        description: "",
    });

    const { createTowingService } = useTowingServiceStore();

    const handleAddTowingService = async () => {
        const { success, message } = await createTowingService(newTowingService);

        if (!success) {
            alert("Error: " + message);  // Display error message in an alert box
        } else {
            alert("Success: " + message);  // Display success message in an alert box
            setNewTowingService({ name: "", price: "", description: "" });
        }
    };

    return (
        <div className={styles.createContainer}>
            <h1 className={styles.createHeading}>Create New Towing Service</h1>

            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Towing Service Name"
                        value={newTowingService.name}
                        onChange={(e) =>
                            setNewTowingService({ ...newTowingService, name: e.target.value })
                        }
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="number"
                        placeholder="Price"
                        value={newTowingService.price}
                        onChange={(e) =>
                            setNewTowingService({ ...newTowingService, price: e.target.value })
                        }
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formGroup}>
                    <textarea
                        placeholder="Description"
                        value={newTowingService.description}
                        onChange={(e) =>
                            setNewTowingService({ ...newTowingService, description: e.target.value })
                        }
                        className={styles.formTextarea}
                    />
                </div>

                <button onClick={handleAddTowingService} className={styles.submitButton}>
                    Add Towing Service
                </button>
            </div>
        </div>
    );
};

export default CreatePage;