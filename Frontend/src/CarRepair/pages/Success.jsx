import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/booking';

const Success = () => {
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
        const response = await fetch(`http://localhost:3000/api/checkout/session/status?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
 
        const data = await response.json();
        console.log('Checkout session status response:', data);
 
        if (data.status === "paid") {
          const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
 
          if (bookingDetails) {
            console.log("Sending bookingDetails to store:", bookingDetails);
            const { success, message } = await createBooking(bookingDetails);
            console.log(success, message);
 
            if (success) {
              alert("Booking successful! 🎉");
              localStorage.removeItem('bookingDetails');
              navigate("/manage/booking");
            } else {
              alert("Failed to create booking: " + message);
            }
          } else {
            navigate("/manage/booking");
          }
        } else {
          alert("Payment not successful.");
          navigate("/manage/booking");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("Error verifying payment: " + error.message);
        navigate("/");
      }
    };
 
    confirmBooking();
  }, [location, navigate, createBooking]);
 
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verifying your payment... 🔄</h2>
    </div>
  );
};

export default Success;