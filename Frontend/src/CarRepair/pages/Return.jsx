import { useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useBookingStore } from '../store/booking';

const Return = () => {
  const location = useLocation();
  const { createBooking } = useBookingStore();
  const { user } = useSelector(state => state.authState);

  const sessionId = location.state?.sessionId;
  const bookingDetails = location.state?.bookingDetails;

  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    if (!sessionId) return;

    fetch(`http://localhost:3000/api/session/status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then(async (data) => {
        setStatus(data.status);
        setCustomerEmail(user.email);

        if (data.status === 'complete') {
          const { success, message } = await createBooking(bookingDetails);
          console.log(success, message);
        }
      });
  }, [sessionId, bookingDetails]);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          <br />
          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return <p>Loading payment status...</p>;
};

export default Return;