import { Link, useNavigate } from 'react-router-dom';
import { useTowingServiceStore } from '../store/towingService';
import React, { useEffect } from 'react';
import TowingServiceCard from '../components/TowingServiceCArd';
import styles from './homePage.module.css'; // Import custom CSS file
import Nav from '../components/Navbar.jsx'

const HomePage = () => {
  const { fetchTowingServices, towingServices } = useTowingServiceStore();

  const navigate = useNavigate();

  const handleRedirectToUserTowingHome = () => {
    navigate("/uth");
  };

  useEffect(() => {
    fetchTowingServices();
  }, [fetchTowingServices]);

  console.log("towing services", towingServices);

  return (
    <div className="">
    <Nav />
    <div className={styles.homeContainer}>
      <div className={styles.heading}>
        <h1>Current Towing Services</h1>
      </div>

      <button onClick={handleRedirectToUserTowingHome} className={styles.goToUserTowingHomeBtn}>
        Go to User Towing Home
      </button>

      {/* Show Loading if Data is Empty */}
      {towingServices.length === 0 ? (
        <p className={styles.loadingText}>Loading services...</p>
      ) : (
        <div className={styles.serviceGrid}>
          {towingServices.map((towingService, index) => (
            <TowingServiceCard 
              key={towingService.id || index} 
              towingService={towingService} 
            />
          ))}
        </div>
      )}

      {/* "No Services Found" Message (Only if Data Loaded and Empty) */}
      {towingServices.length === 0 && (
        <p className={styles.noServiceMessage}>
          No Service found!{" "}
          <Link to="/ct" className={styles.createLink}>
            create a Service
          </Link>
        </p>
      )}
    </div>
    </div>
  );
};

export default HomePage;