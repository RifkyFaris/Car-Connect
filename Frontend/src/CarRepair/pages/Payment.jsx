import React,{useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useBookingStore } from '../store/booking';



const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { createBooking } = useBookingStore(); 

  useEffect(() => {
    const confirmBooking = async () => {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get('session_id');

      if (!sessionId) {
        alert("No session ID found.");
        navigate("/");
        return;
      }

      try {
      
        const response = await fetch(`http://localhost:5000/api/checkout-session-status?session_id=${sessionId}`);
        const data = await response.json();

        if (data.status === "paid") {
          const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

          if (bookingDetails) {
            const { success, message } = await createBooking(bookingDetails); 
            console.log(success, message);

            if (success) {
              alert("Booking successful! 🎉");
              localStorage.removeItem('bookingDetails');
              navigate("/manage/booking");
            } else {
              alert("Failed to create booking: " + message);
            }
          }
        } else {
          alert("Payment not successful.");
          navigate("/manage/booking"); 
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("Error verifying payment.");
        navigate("/manage/booking"); 
      }
    };

    confirmBooking();
  }, [location, navigate, createBooking]);

  

  const style = {
    container: {
      maxWidth: '480px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '20px',
    },
    card: {
      backgroundColor: '#27272a',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    label: {
      color: 'white',
      marginBottom: '10px',
      display: 'block',
    },
    value: {
      color: '#a1a1aa',
      marginBottom: '15px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
  };

  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verifying your payment... 🔄</h2>
    </div>
  );
};

export default Payment;