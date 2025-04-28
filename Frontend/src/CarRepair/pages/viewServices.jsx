import React, { useEffect, useState } from 'react';
import { useServiceStore } from '../store/service';
import ServiceList from '../components/ServiceList';
import ServiceSearch from '../components/ServiceSearch';


const styles = {
    dashboardContainer: {
        textAlign: 'center',
        backgroundColor: '#000',
        color: 'white',
        padding: '20px',
        minHeight: '100vh'
    },
    dashboardTitle: {
        fontSize: '30px',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    dashboardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    }
};

const UserDash = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState('all');
    const { fetchServices, services } = useServiceStore();
   
    useEffect(() => {
        fetchServices();
    }, [fetchServices]);
 
    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             service.shop.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedService === 'all' || service.type === selectedService;
        return matchesSearch && matchesType;
    });
 
    return (
        <div style={styles.dashboardContainer}>
            <div style={styles.dashboardContent}>
                <ServiceSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                />
                <ServiceList services={filteredServices} />
            </div>
        </div>
    );

};

export default UserDash;