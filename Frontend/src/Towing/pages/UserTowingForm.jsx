import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./towingforms.module.css";
import { useUserDetailStore } from "../store/userDetail";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const TowingServiceForm = () => {
    const { serviceId } = useParams();
    const location = useLocation();
    const pricePerKm = location.state?.price || 0;
    

    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        vehicleModel: "",
        vehicleYear: "",
        pickupLocation: "",
        dropLocation: "",
        distance: "",
        payment: "",
    });

    const { createUserDetail } = useUserDetailStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = await createUserDetail(formData);
            if (!success) {
                alert("Error: " + message);
            } else {
                alert("Success: " + message);
                setFormData({
                    name: "",
                    contactNumber: "",
                    vehicleModel: "",
                    vehicleYear: "",
                    pickupLocation: "",
                    dropLocation: "",
                    distance: "",
                    payment: "",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit request. Try again later.");
        }
    };
    console.log(formData);

    const calculateDistance = async () => {
        if (!formData.pickupLocation || !formData.dropLocation) {
            alert("Please enter both Pickup and Destination locations.");
            return;
        }

        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${formData.pickupLocation}&destinations=${formData.dropLocation}&key=${GOOGLE_MAPS_API_KEY}`
            );

            if (response.data.rows[0].elements[0].status === "OK") {
                const distanceInKm = response.data.rows[0].elements[0].distance.value / 1000;
                const calculatedPayment = (distanceInKm * pricePerKm).toFixed(2);

                setFormData((prev) => ({ ...prev, distance: distanceInKm.toFixed(2), payment: calculatedPayment }));
            } else {
                alert("Error fetching distance. Try entering more specific locations.");
            }
        } catch (error) {
            console.error("Error fetching distance:", error);
            alert("Failed to calculate distance. Check the locations entered.");
        }
    };

    return (
        <div className={styles.frame}>
            <h2 className={styles.title}>Towing Service Request</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {Object.keys(formData).map((key) => (
                    key !== "distance" && key !== "payment" && (
                        <div key={key} className={styles.formGroup}>
                            <label className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
                            <input
                                type={key.includes("Year") ? "number" : "text"}
                                name={key}
                                value={formData[key]}
                                onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                                className={styles.input}
                                required
                            />
                        </div>
                    )
                ))}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Distance (km):</label>
                    <input type="text" name="distance" value={formData.distance} className={styles.input} readOnly />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Payment (Rs):</label>
                    <input type="text" name="payment" value={formData.payment} className={styles.input} readOnly />
                </div>
                <button type="button" onClick={calculateDistance} className={styles.button}>Calculate Distance & Payment</button>
                <button type="submit" className={styles.button}>Submit Request</button>
            </form>
        </div>
    );
};

export default TowingServiceForm;