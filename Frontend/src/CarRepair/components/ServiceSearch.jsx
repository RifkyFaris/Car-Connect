import React from 'react';
import { Search } from 'lucide-react';
import '../style1.css'
const ServiceSearch = ({ searchQuery, setSearchQuery, selectedService, setSelectedService }) => {
  return (
    <div className="search-section">
      <h1 className="search-title">Find Auto Services Near You</h1>
      
      <div className="search-container">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search services or shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{width:'800px'}}
          />
        </div>
        
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="service-select"
          style={{height:'45px',marginTop:'9px'}}
        >
          <option value="all">All Services</option>
          <option value="maintenance">Maintenance</option>
          <option value="repair">Repair</option>
          <option value="diagnostic">Diagnostic</option>
        </select>
      </div>
    </div>
  );
};

export default ServiceSearch;