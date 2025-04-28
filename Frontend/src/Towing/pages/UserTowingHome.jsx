import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./userTowingHome.module.css";

const UserTowingHome = () => {
  const [towingServices, setTowingServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTowingServices = async () => {
      try {
        const response = await axios.get("/api/gettowing");
        setTowingServices(response.data.data);
      } catch (error) {
        console.error("Error fetching towing services:", error);
        setError("Failed to load towing services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTowingServices();
  }, []);

  const handleRedirectToForm = (serviceId, price) => {
    navigate(`/utf/${serviceId}`, { state: { price } });
  };

  return (
    <div className={styles.userTowingHome}>
      <h2 className={styles.heading}>Available Towing Services</h2>
      {loading ? (
        <p>Loading towing services...</p>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <div className={styles.frameContainer}>
          {towingServices.length > 0 ? (
            towingServices.map((service) => (
              <div key={service._id} className={styles.frame}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <p className={styles.servicePrice}>Price (Per Km): Rs. {service.price}</p>
                <button
                  className={styles.selectBtn}
                  onClick={() => handleRedirectToForm(service._id, service.price)}
                >
                  Select Service
                </button>
              </div>
            ))
          ) : (
            <p>No towing services available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserTowingHome;