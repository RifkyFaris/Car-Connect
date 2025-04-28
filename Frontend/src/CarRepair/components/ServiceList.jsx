import React, { useState } from 'react';
import { MapPin, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceList = ({ services }) => {
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    // Navigate to /booking and pass the service details as state
    navigate('/booking', { state: { service } });
  };

  return (
    <div className="service-grid">
      {services.map((service) => (
        <div key={service._id} className="service-card">
          <h3 className="service-title">{service.name}</h3>
          <div className="shop-name">{service.shop}</div>
          
          <div className="service-details">
            <div className="detail-item">
              <MapPin className="detail-icon" />
              <span>{service.distance} miles</span>
            </div>
            <div className="detail-item">
              <Star className="detail-icon star" />
              <span>{service.rating}</span>
            </div>
          </div>
          
          <div className="service-footer">
            <div className="price">
              <DollarSign className="price-icon" />
              <span className="price-amount">{service.price}</span>
            </div>
                    
            <button
              className="book-button"
              onClick={() => handleBookNow(service)} // Pass service to handleBookNow
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;