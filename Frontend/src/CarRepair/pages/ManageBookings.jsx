import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/booking';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Navbar'
import { color } from 'framer-motion';

const ManageBookings = () => {

   const{ fetchBooking, bookings, deleteBooking }=useBookingStore();
  const navigate = useNavigate();


  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  

  const DeleteBooking = async (sid) => {
    const { success } = await deleteBooking(sid);
    if (success) {
        toast.success("Booking cancelled successfully! 🎉"); 
        fetchBooking();
    } else {
      toast.error("Failed to cancel booking. Try again! ❌");
      console.error("Failed to update booking", error);
    }
  };

  return (
    <div className="">
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Shop</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} style={styles.tr}>
              <td style={styles.td}>{booking.service}</td>
              <td style={styles.td}>{booking.vendor}</td>
              <td style={styles.td}>{formatDate(booking.date)}</td>
              <td style={styles.td}>{booking.time}</td>
              <td style={styles.td}>{booking.location}</td>
              <td style={styles.td}>{booking.price}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, backgroundColor: '#c62a36' }}
                  onClick={() => DeleteBooking(booking._id)}
                >
                  Delete
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: '#023D54' }}
                  onClick={() => navigate('/update/booking', { state: { booking } })}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
  );
};

const styles = {
  container: {
    padding: '10px',
    minHeight:'600px'
  },
  table: {
    marginTop:'30px',
    width: '80%',
    marginLeft:'150px',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
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

export default ManageBookings;