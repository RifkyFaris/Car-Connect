import React, { useEffect } from 'react';
import { useServiceStore } from '../store/service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Operations = () => {
  const { fetchServices, services, deleteService } = useServiceStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const DeleteService = async (sid) => {
    const { success } = await deleteService(sid);
    if (success) {
      toast.success("Service Removed successfully! 🎉");
    } else {
       toast.error("Failed to remove booking. Try again! ❌");
            console.error("Failed to update booking", error);
    }
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Shop</th>
            <th style={styles.th}>Distance</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} style={styles.tr}>
              <td style={styles.td}>{service.name}</td>
              <td style={styles.td}>{service.vendor}</td>
              <td style={styles.td}>{service.distance}</td>
              <td style={styles.td}>{service.rating}</td>
              <td style={styles.td}>{service.price}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, backgroundColor: '#c62a36' }}
                  onClick={() => DeleteService(service._id)}
                >
                  Delete
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: '#023D54' }}
                  onClick={() => navigate('/update/service', { state: { service } })}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    minHeight:'600px',
    
  },
  table: {
    marginTop:'30px',
    width: '80%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    marginLeft:'150px',
    border: '2px solid #196662',
  },
  thead: {
    backgroundColor: '#c62a36',
    color: 'white',
  },
  th: {
    padding: '10px',
    fontSize: '18px',
    textAlign: 'center',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    fontSize: '16px',
    textAlign: 'center',
    color:'white'
  },
  button: {
    color: 'white',
    padding: '8px 12px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Operations;