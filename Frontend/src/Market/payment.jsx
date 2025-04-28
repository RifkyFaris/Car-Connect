import { useState, useEffect } from 'react';
import '../Profile/Login.css';
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { orderCompleted } from './slice/cartSlice.jsx';
import { validateShipping } from './Shipping.jsx';
import { createOrder } from './actions/orderActions.jsx';
import { clearError as clearOrderError } from './slice/orderSlice.jsx';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const { user } = useSelector(state => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
  const { error: orderError } = useSelector(state => state.orderState);

  const [otpSent, setOtpSent] = useState(false); 
  const [otp, setOtp] = useState(''); 
  const [otpVerified, setOtpVerified] = useState(false); 

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        line2: shippingInfo.district,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast.error(orderError, {
        onOpen: () => { dispatch(clearOrderError()); }
      });
    }
  }, [orderError, dispatch, shippingInfo, navigate]);

  const sendOtp = async () => {
    try {
      await axios.get(`/api/send/otp`);
      setOtpSent(true);
      toast.success("OTP sent to registered e-mail address.");
    } catch (error) {
      toast.error("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post(`/api/verify/otp`, { otp });
      if (data.message === "OTP verified successfully") {
        setOtpVerified(true);
        toast.success("OTP verified successfully.");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    if (!otpVerified) {
      toast.error("Please verify OTP first.");
      document.querySelector('#pay_btn').disabled = false;
      return;
    }

    try {
      const { data } = await axios.post(`/api/payment/process`, paymentData);
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            phone: user.phoneNo,
          }
        }
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          toast.success("Payment Success");
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));
          navigate('/order/success');
        } else {
          toast.error("Please try again.");
        }
      }
    } catch (error) {
      toast.error("Check card details");
      document.querySelector('#pay_btn').disabled = false;
    }
  };

  return (
    <div className='container1'>
      <div className="register">
        <p className="login-title">Payment</p>

        <div className="form-div">
          <form onSubmit={submitHandler}>
            <label className="label" htmlFor="cNo">Card Number</label><br />
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="input"
            />
            <br /><br />

            <label className="label" htmlFor="exp">Card Expiry</label><br />
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="input"
            /><br /><br />

            <label className="label" htmlFor="cvc">Card CVC</label><br />
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="input"
            /><br />

            {otpSent ? (
              <>
                
                {otpVerified  ? (
              <>
                
                <input type="submit" id="pay_btn" className="submit" value={`Pay-Rs. ${orderInfo.totalPrice}`} />
              </>
            ) : (
              <><label className="label" htmlFor="otp">Enter OTP</label><br />
              <input
                type="text"
                id="otp"
                className="input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <input type="button" className="submit"  onClick={verifyOtp} value="Verify OTP"/></>
            )}
              </>
            ) : (
              <input type="button" className="submit" onClick={sendOtp} value="Send OTP"/>
            )}
            

            
            <br /><br />

            <div className="paymentImages" style={{ width: "250px", marginLeft: "25px" }}>
              <img src="/MarketImages/american.png" className="paymentlogo" style={{ marginRight: "30px", marginLeft: "20px" }} />
              <img src="/MarketImages/visa.png" className="paymentlogo" style={{ marginRight: "30px" }} />
              <img src="/MarketImages/mastercard.png" className="paymentlogo" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
